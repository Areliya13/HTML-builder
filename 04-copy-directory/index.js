const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');
const { stdin, stdout } = require('process');

const folder = path.join(__dirname, './files');
const newFolder = path.join(__dirname, './files-copy');


try {
  const createDir = fsPromise.mkdir(newFolder, { recursive: true });
} catch (err) {
  stdout.write(err.message);
}

fs.readdir(folder, {withFileTypes: true}, (err, dirents) => {
  if (err) throw err;
  dirents.forEach((dirent) => {
    if (dirent.isFile()) {
      const from = path.join(folder, dirent.name);
      const to = path.join(newFolder, dirent.name);
      try {
      fsPromise.copyFile(from, to);
      }
      catch (err) {
        stdout.write(err.message);
      }
    }
  })
});
