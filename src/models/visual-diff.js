const fs = require('fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

class VisualDiff {
  constructor(refImagePath, compImagePath, diffImagePath) {
    this.refImagePath = refImagePath;
    this.compImagePath = compImagePath;
    this.diffImagePath = diffImagePath;

    this.refImage = this.readImage(this.refImagePath);
    this.compImage = this.readImage(this.compImagePath);

    this.width = this.refImage.width;
    this.height = this.refImage.height;

    this.createDiff();

    if (diffImagePath) {
      this.saveDiffImage(diffImagePath);
    }
  }

  readImage(imagePath) {
    return PNG.sync.read(fs.readFileSync(imagePath));
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

    return this.diff;
  }

  saveDiffImage(filePath) {
    fs.writeFileSync(filePath, PNG.sync.write(this.diff));
  }
}

new VisualDiff('./screenshot.png', './screenshot-uat.png', './dff-2.png');