const path = require('path');
const fs = require('fs');
const { ipcMain } = require('electron');
const Page = require('../models/page');
const Screenshot = require('../models/screenshot');
const VisualDiff = require('../models/visual-diff');
const PageSource = require('../models/page-source');
const PNG = require('pngjs').PNG;

const controllerName = 'ComparisonController';

class ComparisonController {
  constructor() {
    ipcMain.on(`${controllerName}-compareUrls`, this.compareUrls.bind(this));
  }

  async createScreenshot(page, width, height) {
    const screenshot = new Screenshot(page, width, height);
    await screenshot.capture();

    const imageBuffer = Buffer.from(screenshot.getBase64(), 'base64');
    const imagePNG = PNG.sync.read(imageBuffer);

    return {
      ...screenshot,
      width: imagePNG.width,
      height: imagePNG.height
    }
  }

  async compareUrls(event, args) {
    const settings = JSON.parse(fs.readFileSync(path.resolve('settings.json')));
    this.viewports = settings.viewports;
    const replyUrl = `${controllerName}-compareUrls-reply`;
    const refPageUrl = args.refPageUrl;
    const compPageUrl = args.compPageUrl;

    if (!refPageUrl || !compPageUrl) {
      throw new Error('Reference and comparison page URLs are required.');
    }

    event.reply(replyUrl, {
      progress: 1,
      viewports: this.viewports,
      statusMessage: 'Loading reference and comparison pages'
    });

    const refPage = new Page();
    await refPage.open(refPageUrl);

    const compPage = new Page();
    await compPage.open(compPageUrl);
    
    event.reply(replyUrl, {
      progress: 5,
      viewports: this.viewports,
      statusMessage: 'Computing reference and comparison page heights'
    });

    const refPageHeights = {};

    for (const viewport of this.viewports) {
      await refPage.instance.setViewport({ width: viewport, height: 1024 });
      refPageHeights[viewport] = await refPage.instance.evaluate(() => document.documentElement.scrollHeight);
    }

    event.reply(replyUrl, {
      progress: 20,
      statusMessage: 'Creating screenshots'
    });

    let images = {};
    
    const refScreenshotPromises = this.viewports.map(viewport =>
      this.createScreenshot(refPageUrl, viewport, refPageHeights[viewport])
    );

    const compScreenshotPromises = this.viewports.map(viewport => 
      this.createScreenshot(compPageUrl, viewport, refPageHeights[viewport])
    );

    const refScreenshots = await Promise.all(refScreenshotPromises);
    const compScreenshots = await Promise.all(compScreenshotPromises);

    event.reply(replyUrl, {
      progress: 60,
      statusMessage: 'Computing visual differences'
    });

    const diffImages = this.viewports.map((viewport, index) =>
      new VisualDiff(refScreenshots[index], compScreenshots[index])
    );

    // Organize images in object by viewport
    this.viewports.forEach((viewport, index) => {
      images[viewport] = {
        refImage: refScreenshots[index].base64,
        compImage: compScreenshots[index].base64,
        diffImage: diffImages[index].base64
      };
    });

    event.reply(replyUrl, {
      progress: 80,
      images,
      statusMessage: 'Fetching and beautifying reference page source code'
    });

    const refPageSourceInstance = new PageSource(refPage);
    const refPageSource = await refPageSourceInstance.getSource();

    event.reply(replyUrl, {
      progress: 90,
      refPageSource,
      statusMessage: 'Fetching and beautifying comparison page source code'
    });

    const compPageSourceInstance = new PageSource(compPage);
    const compPageSource = await compPageSourceInstance.getSource();

    event.reply(replyUrl, {
      progress: 100,
      compPageSource
    });
  }
}

module.exports = ComparisonController;
