const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin, stdout } = require('process');

const pathObj = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({input: stdin, output: stdout});
let fsWriteStream = fs.createWriteStream(pathObj,'utf-8');

rl.write('Enter data to file:\n');
rl.on('line', (input) => {
  if (input === 'exit'){
    endWriting();
  } else {
    fsWriteStream.write(input + '\n');
  }
});

const endWriting = () => {
  rl.write('End of writing data.');
  rl.close();
}

rl.on('SIGINT', endWriting);