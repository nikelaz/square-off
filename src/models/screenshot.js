const fs = require('fs');

class Screenshot {
  constructor(page, width, filePath) {
    this.page = page;
    this.width = width;
    this.filePath = filePath;
  }

  async capture() {
    // Set screen size
    await this.page.setViewport({ width: this.width, height: 1024 });
    
    // Create Screenshot
    await this.page.screenshot({
      path: this.filePath,
      fullPage: true,
    });
  }

  removeFile() {
    return new Promise((resolve, reject) => {
      fs.unlink(this.filePath, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}

module.exports = Screenshot;
