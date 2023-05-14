const BrowserSingleton = require('./browser-singleton');

class Page {
  async open(url) {
    const browser = await BrowserSingleton.getInstance();
    this.instance = await browser.newPage();
    await this.instance.goto(url);
    await this.instance.setViewport({ width: 1981, height: 1024 });
  }
}

module.exports = Page;
