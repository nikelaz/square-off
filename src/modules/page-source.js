const fs = require('fs');
const Page = require('./page');

class PageSource {
  constructor(page) {
    this.page = page;
  }

  async getSource() {
    this.source = await this.page.content();
    return this.source;
  }
}

module.exports = PageSource;
