const path = require('path');
const fs = require('fs');
const Page = require('../models/page');
const wait = require('../helpers/wait');

class Screenshot {
  constructor(pageUrl, width, height) {
    this.pageUrl = pageUrl;
    this.width = width;
    this.height = height;
    this.base64 = null;
  }

  async capture() {
    const settings = JSON.parse(fs.readFileSync(path.resolve('settings.json')));

    // Open page
    this.page = new Page();
    await this.page.open(this.pageUrl);

    // Set screen size
    await this.page.instance.setViewport({ width: this.width, height: this.height || 1024 });

    await this.page.instance.waitForNetworkIdle();

    await wait(settings.pageLoadTimeout || 1000);
    
    // Create Screenshot
    this.base64 = await this.page.instance.screenshot({
      fullPage: this.height ? false : true,
      encoding: 'base64'
    });
  }

  getBase64() {
    return this.base64;
  }
}

module.exports = Screenshot;
