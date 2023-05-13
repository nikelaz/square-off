const BrowserSingleton = require('./browser-singleton');

class Page {
  async open(url) {
    const browser = await BrowserSingleton.getInstance();
    this.instance = await browser.newPage();
    await this.instance.goto(url);
  }
}

module.exports = Page;
