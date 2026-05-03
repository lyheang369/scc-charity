import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Directory paths
const imgDir = path.join(process.cwd(), 'public', 'img');
const logosDir = path.join(process.cwd(), 'public', 'logos');

// Image processing options
const qualitySettings = 80;
const resizeDimensions = { width: null, height: null }; // Keep original dimensions

// Process all images in img/ directory
const imgFiles = [
  'All_group_Members_image.JPEG',
  'event-poster.jpg',
  'khqr-donation.png'
];

// Process all images in logos/ directory
const logoFiles = [
  'CamEd_Logo.png'
];

// Function to convert image
async function convertImage(inputPath, outputPath) {
  try {
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process the image
    const pipeline = sharp(inputPath)
      .resize(resizeDimensions.width, resizeDimensions.height, {
        withoutEnlargement: true
      })
      .webp({
        quality: qualitySettings
      });

    await pipeline.toFile(outputPath);

    // Get file sizes for comparison
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main conversion process
async function main() {
  console.log('Converting images to WebP format...\n');

  // Convert images in img directory
  console.log('Processing images in /img...');
  for (const file of imgFiles) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, file.replace(/\.jpe?g|\.png/i, '.webp'));

    if (fs.existsSync(inputPath)) {
      await convertImage(inputPath, outputPath);
    } else {
      console.log(`${file} not found. Skipping...`);
    }
  }

  // Convert images in logos directory
  console.log('\nProcessing images in /logos...');
  for (const file of logoFiles) {
    const inputPath = path.join(logosDir, file);
    const outputPath = path.join(logosDir, file.replace(/\.png/i, '.webp'));

    if (fs.existsSync(inputPath)) {
      await convertImage(inputPath, outputPath);
    } else {
      console.log(`${file} not found. Skipping...`);
    }
  }

  console.log('\nImage conversion complete!');
}

// Run the main function
await main();