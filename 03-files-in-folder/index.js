const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

const pathObj = path.join(__dirname, './secret-folder');

fs.readdir(pathObj, {withFileTypes: true}, (err, dirents) => {
  if (err) throw err;
  dirents.forEach((dirent) => {
    if (dirent.isFile()) {
      printFileInfo(dirent.name, pathObj);
    }
  })
});

printFileInfo = (file, folder) => {
  const pathToFile = path.join(folder, file);
  fs.stat(pathToFile, (err, stats) => {
    if (err) throw err;
    const fileName = path.parse(pathToFile).name;
    const fileExt = path.parse(pathToFile).ext.slice(1);
    const fileSize = (stats.size / 1024).toFixed(3);
    stdout.write(`${fileName} - ${fileExt} - ${fileSize}kb\n`);
  })
}