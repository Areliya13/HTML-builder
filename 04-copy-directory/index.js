const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

const folder = path.join(__dirname, './files');
const newFolder = path.join(__dirname, './files-copy');

fs.rm(newFolder, {recursive: true, force: true}, (err) => {
  if (err) stdout.write(err.message);
  // stdout.write('Clear\n');
  fs.mkdir(newFolder, {recursive: true}, (err) => {
    if (err) stdout.write(err.message);
    // stdout.write('New directory\n');
    fs.readdir(folder, {withFileTypes: true}, (err, files) => {
      // stdout.write('Make it\n');
      if (err) stdout.write(err.message);
      // stdout.write('And it\n');
      files.forEach(file => {
        // stdout.write(file.name + '\n');
        if (file.isFile()) {
          const from = path.join(folder, file.name);
          const to = path.join(newFolder, file.name);
          fs.copyFile(from, to, err => {
            if (err) stdout.write(err.message);
          });
        }
      });
    });
  });
});