const wait = require('../helpers/wait');

class Screenshot {
  constructor(page, width, height) {
    this.page = page;
    this.width = width;
    this.height = height;
    this.base64 = null;
  }

  async capture() {
    // Set screen size
    await this.page.setViewport({ width: this.width, height: this.height || 1024 });

    await this.page.waitForNetworkIdle();

    await wait(1000);
    
    // Create Screenshot
    this.base64 = await this.page.screenshot({
      fullPage: this.height ? false : true,
      encoding: 'base64'
    });
  }

  getBase64() {
    return this.base64;
  }
}

module.exports = Screenshot;
