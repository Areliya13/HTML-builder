const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

const styles = path.join(__dirname, './styles');
const folder = path.join(__dirname, './project-dist');
const fileObj = path.join(folder, 'bundle.css');

fs.readdir(styles, {withFileTypes: true}, (err, files) => {
  if (err) stdout.write(err.message);
  let fsWrite = fs.createWriteStream(fileObj, 'utf-8');
  files.forEach(file => {
    if (file.isFile()) {
      if (err) stdout.write(err.message);
      const pathToFile = path.join(styles, file.name);
      const fileExt = path.parse(pathToFile).ext;
      if (fileExt === '.css'){
        stdout.write(file.name + '\n');
        let fsRead = fs.createReadStream(pathToFile, 'utf-8');
        fsRead.pipe(fsWrite);
      }
    }
  });
});