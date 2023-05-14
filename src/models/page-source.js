const fs = require('fs');
const Page = require('./page');
// const prettify = require('html-prettify');
const pretty = require('pretty');


class PageSource {
  constructor(page) {
    this.page = page;
  }

  async getSource() {
    this.source = await this.page.content();
    this.source = pretty(this.source);
    return this.source;
  }
}

module.exports = PageSource;
