const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const bentoDir = path.join(__dirname, 'public/Bento Cards');
const outFile = path.join(__dirname, 'components/bentoLayout.json');

const files = fs.readdirSync(bentoDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

// Sort naturally (1.jpg, 2.jpg... 10.jpg)
files.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/) ? a.match(/\d+/)[0] : 0, 10);
  const numB = parseInt(b.match(/\d+/) ? b.match(/\d+/)[0] : 0, 10);
  return numA - numB;
});

const layout = files.map(file => {
  const dimensions = sizeOf(path.join(bentoDir, file));
  const ratio = dimensions.width / dimensions.height;
  
  let type = "square"; // close to 1:1
  if (ratio > 1.2) type = "landscape";
  if (ratio < 0.8) type = "portrait";

  return {
    id: parseInt(file.match(/\d+/) ? file.match(/\d+/)[0] : 0, 10),
    file: file,
    type: type,
    width: dimensions.width,
    height: dimensions.height,
    ratio: ratio
  };
});

fs.writeFileSync(outFile, JSON.stringify(layout, null, 2));
console.log(`Generated layout for ${layout.length} bento images!`);
