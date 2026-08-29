const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('public/logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Smooth alpha mask for white/near-white background
        const minVal = Math.min(r, g, b);
        if (minVal > 220) {
          if (minVal > 248) {
            this.data[idx + 3] = 0; // Fully transparent
          } else {
            // Smooth edge blending
            const alpha = Math.floor((255 - minVal) * 9);
            this.data[idx + 3] = Math.min(255, Math.max(0, alpha));
          }
        }
      }
    }

    this.pack().pipe(fs.createWriteStream('public/logo_transparent.png'))
      .on('finish', () => {
        console.log('Successfully created public/logo_transparent.png with transparent background!');
      });
  });
