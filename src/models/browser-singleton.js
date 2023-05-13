const puppeteer = require('puppeteer');

let browserInstance = null;

class BrowserSingleton {
  constructor() {
    throw new Error('The use of this constructor is forbidden. Use the getInstance() method instead.')
  }
  static async getInstance() {
    if (browserInstance) return browserInstance;

    browserInstance = await puppeteer.launch({ headless: 'new' });
    return browserInstance;
  }
}

module.exports = BrowserSingleton;
