const { ipcMain } = require('electron');
const Page = require('../models/page');
const Screenshot = require('../models/screenshot');
const VisualDiff = require('../models/visual-diff');
const PageSource = require('../models/page-source');
const PNG = require('pngjs').PNG;
const wait = require('../helpers/wait');

const controllerName = 'ComparisonController';

class ComparisonController {
  constructor() {
    ipcMain.on(`${controllerName}-compareUrls`, this.compareUrls);
  }

  async compareUrls(event, args) {
    const replyUrl = `${controllerName}-compareUrls-reply`;
    const refPageUrl = args.refPageUrl;
    const compPageUrl = args.compPageUrl;

    if (!refPageUrl || !compPageUrl) {
      throw new Error('Reference and comparison page URLs are required.');
    }

    event.reply(replyUrl, {
      progress: 5,
      statusMessage: 'Loading reference page'
    });

    const refPage = new Page();
    await refPage.open(refPageUrl);
    const refPageHeight = await refPage.instance.evaluate(() => document.documentElement.offsetHeight);
    refPage.instance.setViewport({ width: 1981, height: refPageHeight });

    event.reply(replyUrl, {
      progress: 15,
      statusMessage: 'Creating reference page screenshot'
    });

    const refScreenshot = new Screenshot(refPage.instance, 1981, refPageHeight);
    await refScreenshot.capture();

    const refImageBuffer = Buffer.from(refScreenshot.getBase64(), 'base64');
    const refImagePNG = PNG.sync.read(refImageBuffer);

    event.reply(replyUrl, {
      progress: 30,
      refImage: refScreenshot.getBase64(),
      statusMessage: 'Loading comparison page'
    });

    const compPage = new Page();
    await compPage.open(compPageUrl);

    event.reply(replyUrl, {
      progress: 45,
      statusMessage: 'Creating comparison page screenshot'
    });

    const compScreenshot = new Screenshot(compPage.instance, refImagePNG.width, refImagePNG.height);
    await compScreenshot.capture();

    event.reply(replyUrl, {
      progress: 60,
      compImage: compScreenshot.getBase64(),
      statusMessage: 'Computing visual differences'
    });

    const diffImage = new VisualDiff(refScreenshot, compScreenshot);

    event.reply(replyUrl, {
      progress: 75,
      diffImage: diffImage.getBase64(),
      statusMessage: 'Fetching and beautifying reference page source code'
    });

    const refPageSourceInstance = new PageSource(refPage.instance);
    const refPageSource = await refPageSourceInstance.getSource();

    event.reply(replyUrl, {
      progress: 80,
      refPageSource,
      statusMessage: 'Fetching and beautifying comparison page source code'
    });

    const compPageSourceInstance = new PageSource(compPage.instance);
    const compPageSource = await compPageSourceInstance.getSource();

    event.reply(replyUrl, {
      progress: 100,
      compPageSource
    });
  }
}

module.exports = ComparisonController;
