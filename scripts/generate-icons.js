import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, drawFn) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const body = Buffer.concat([typeBuf, data]);
    const crc = crc32(body);
    crcBuf.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  function crc32(buf) {
    let c;
    let crcTable = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      crcTable[n] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate cute pastel icon
function drawPastelNotebook(x, y, w, h, isMaskable = false) {
  const nx = x / w;
  const ny = y / h;

  // Background
  let r = 245, g = 236, b = 225, a = 255; // #f5ece1

  if (isMaskable) {
    // Solid cute pastel background extending full bleed
    r = 219; g = 39; b = 119; a = 255; // #db2777
  }

  // Notebook shape inside
  const margin = isMaskable ? 0.16 : 0.08;
  const left = margin;
  const right = 1 - margin;
  const top = margin;
  const bottom = 1 - margin;

  if (nx >= left && nx <= right && ny >= top && ny <= bottom) {
    // Cute notebook cover: Gradient from pastel rose #f472b6 to pink #db2777
    const grad = (nx - left) / (right - left) * 0.4 + (ny - top) / (bottom - top) * 0.6;
    r = Math.round(244 - grad * 35);
    g = Math.round(114 - grad * 75);
    b = Math.round(182 - grad * 63);

    // Notebook spine/binding on left
    if (nx <= left + 0.08) {
      r = 93; g = 147; b = 220; // #5d93dc cute blue binding
    }

    // Gold rings on spine
    const ringY = [0.25, 0.38, 0.51, 0.64, 0.77];
    for (const ry of ringY) {
      const dy = Math.abs(ny - ry);
      const dx = Math.abs(nx - (left + 0.04));
      if (dx < 0.035 && dy < 0.03) {
        r = 248; g = 195; b = 37; // #f8c325 gold ring
      }
    }

    // Cute sticky note in center
    const snLeft = left + 0.22;
    const snRight = right - 0.15;
    const snTop = top + 0.22;
    const snBottom = bottom - 0.22;

    if (nx >= snLeft && nx <= snRight && ny >= snTop && ny <= snBottom) {
      // Butter yellow sticky note #fef08a
      r = 254; g = 240; b = 138;

      // Heart or cute face in sticky note
      const cx = (snLeft + snRight) / 2;
      const cy = (snTop + snBottom) / 2;
      const dist = Math.sqrt((nx - cx)**2 + (ny - cy)**2);
      if (dist < 0.08) {
        // Pink heart in center
        r = 235; g = 60; b = 130;
      }
    }
  }

  return [r, g, b, a];
}

const publicDir = path.resolve('./public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, (x, y, w, h) => drawPastelNotebook(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, (x, y, w, h) => drawPastelNotebook(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, (x, y, w, h) => drawPastelNotebook(x, y, w, h, true)));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, (x, y, w, h) => drawPastelNotebook(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPNG(32, 32, (x, y, w, h) => drawPastelNotebook(x, y, w, h, false)));

console.log('PWA PNG Icons generated successfully!');
