const fs = require('fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

class VisualDiff {
  constructor(refScreenshot, compScreenshot) {
    this.refScreenshot = refScreenshot;
    this.compScreenshot = compScreenshot;

    this.refImage = this.parseImage(this.refScreenshot.base64);
    this.compImage = this.parseImage(this.compScreenshot.base64);

    this.width = this.refImage.width;
    this.height = this.refImage.height;

    this.createDiff();
  }

  parseImage(imageData) {
    const imageBuffer = Buffer.from(imageData, 'base64');
    return PNG.sync.read(imageBuffer);
  }

  createDiff() {
    this.diff = new PNG({
      width: this.width,
      height: this.height
    });

    this.diffPixelCount = pixelmatch(
      this.refImage.data,
      this.compImage.data,
      this.diff.data,
      this.width,
      this.height
    );

    this.base64 = PNG.sync.write(this.diff).toString('base64');
    return this.base64;
  }

  getBase64() {
    return this.base64;
  }
}

module.exports = VisualDiff;
