const path = require('path');
const pathObj = path.join(__dirname, 'text.txt');
const fs = require('fs');
let fsReadStream = fs.createReadStream(pathObj,'utf-8');

fsReadStream.on('data', chunk => console.log(chunk));
// fsReadStream.on('end', ()=> {});
fsReadStream.on('error', err => console.log(err));