const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const srcDir = path.join(__dirname, 'frontend', 'dist');
const destDir = path.join(__dirname, 'dist');

if (fs.existsSync(srcDir)) {
  copyDir(srcDir, destDir);
  console.log('Successfully copied frontend/dist to root dist folder');
} else {
  console.error('Error: frontend/dist directory not found!');
  process.exit(1);
}
