const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/sequence');

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  
  console.log(`Found ${files.length} images to optimize.`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(dir, file);
    const parsed = path.parse(file);
    const outputPath = path.join(dir, `${parsed.name}.webp`);
    
    // Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      continue;
    }
    
    console.log(`Processing ${i + 1}/${files.length}: ${file} -> ${path.basename(outputPath)}`);
    
    await sharp(inputPath)
      .resize(1280) // Resize to max 720p/1080p width to save immense space
      .webp({ quality: 60 }) // High compression for sequence
      .toFile(outputPath);
      
    // Delete the original to save space
    fs.unlinkSync(inputPath);
  }
  
  console.log('Finished optimizing images to WebP!');
}

processImages().catch(console.error);
