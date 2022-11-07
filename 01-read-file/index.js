const path = require('path');
const process = require('process');
const fs = require('fs');

const pathObj = path.join(__dirname, 'text.txt');
let fsReadStream = fs.createReadStream(pathObj,'utf-8');

fsReadStream.on('data', chunk => process.stdout.write(chunk));
// fsReadStream.on('end', () => process.stdout.write('Done!'));
fsReadStream.on('error', err => console.log(err));