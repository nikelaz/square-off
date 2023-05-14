const fs = require('fs');

class Screenshot {
  constructor(page, width) {
    this.page = page;
    this.width = width;
    this.base64 = null;
  }

  async capture() {
    // Set screen size
    await this.page.setViewport({ width: this.width, height: 1024 });
    
    // Create Screenshot
    this.base64 = await this.page.screenshot({
      fullPage: true,
      encoding: 'base64'
    });
  }

  getBase64() {
    return this.base64;
  }
}

module.exports = Screenshot;
