const BrowserSingleton = require('./browser-singleton');

class Page {
  async open(url, width = 1980) {
    const browser = await BrowserSingleton.getInstance();
    this.instance = await browser.newPage();
    await this.instance.setDefaultNavigationTimeout(0);
    const response = await this.instance.goto(url);
    this.source = await response.text();
    await this.instance.setViewport({ width, height: 1024 });
  }
}

module.exports = Page;
