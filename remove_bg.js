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

        // Calculate lightness
        const brightness = (r + g + b) / 3;

        // Smooth alpha mask for white/near-white background
        if (r > 235 && g > 235 && b > 235) {
          // Calculate opacity transition for anti-aliasing around edges
          const minVal = Math.min(r, g, b);
          if (minVal > 250) {
            this.data[idx + 3] = 0; // Fully transparent
          } else {
            // Smooth edge blending
            const alpha = Math.floor((255 - minVal) * 12);
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
