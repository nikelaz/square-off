const { ipcMain } = require('electron');
const Page = require('../models/page');
const Screenshot = require('../models/screenshot');
const VisualDiff = require('../models/visual-diff');

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

    const refPage = new Page();
    await refPage.open(refPageUrl);

    event.reply(replyUrl, { progress: 25 });
    
    const compPage = new Page();
    await compPage.open(compPageUrl);

    event.reply(replyUrl, { progress: 50 });

    const refScreenshot = new Screenshot(refPage.instance, 1981, './tmp/ref.png');
    await refScreenshot.capture();

    event.reply(replyUrl, {
      progress: 75,
      refImage: refScreenshot.getBase64()
    });

    const compScreenshot = new Screenshot(compPage.instance, 1981, './tmp/comp.png');
    await compScreenshot.capture();

    event.reply(replyUrl, {
      progress: 75,
      compImage: compScreenshot.getBase64()
    });

    const diffImage = new VisualDiff(refScreenshot, compScreenshot);
    event.reply(replyUrl, {
      progress: 75,
      diffImage: diffImage.getBase64()
    });

    event.reply(replyUrl, { progress: 100 });
  }
}

module.exports = ComparisonController;
