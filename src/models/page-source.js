const fs = require('fs');
const Page = require('./page');
const pretty = require('pretty');


class PageSource {
  constructor(page) {
    this.page = page;
  }

  async getSource() {
    this.source = await this.page.source;
    this.source = pretty(this.source);
    return this.source;
  }
}

module.exports = PageSource;
