const path = require('path');
const { rm, mkdir, readdir, copyFile, readFile, writeFile } = require('fs/promises');
const { createWriteStream } = require('fs');

const assetsInput = path.join(__dirname, 'assets');
const stylesInput = path.join(__dirname, 'styles');
const htmlInput = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');

const dist = path.join(__dirname, 'project-dist');
const assetsOutput = path.join(dist, 'assets');
const stylesOutput = path.join(dist, 'style.css');
const htmlOutput = path.join(dist, 'index.html');

async function createPage() {
  try {
    await rm(dist, { force: true, recursive: true });
    await mkdir(dist, { recursive: true });
    await copyFolder(assetsInput, assetsOutput);
    await bundleCss(stylesInput, stylesOutput);
    await bundleHTML(htmlInput, htmlOutput, components);
  } catch (err) {
    console.log(err.message);
  }
}

async function copyFolder(from, to) {
  try {
    await mkdir(to, { recursive: true });
    await copyFiles(from, to);
    const folders = await readdir(from, { withFileTypes: true });
    folders.forEach((folder) => {
      if (folder.isDirectory()) {
        const fromPath = path.join(from, folder.name);
        const toPath = path.join(to, folder.name);
        copyFolder(fromPath, toPath);
      }
    })
  } catch (err) {
    console.log(err.message);
  }
}

async function copyFiles(from, to) {
  try {
    const files = await readdir(from, { withFileTypes: true });
    files.forEach((file) => {
        if (file.isFile()){
          const fromPath = path.join(from, file.name);
          const toPath = path.join(to, file.name);
          copyFile(fromPath, toPath);
        }
      });
  } catch (err) {
    console.log(err.message);
  }
}

async function bundleCss(styles, distPath) {
  try {
    const files = await readdir(styles, { withFileTypes: true });
    const writeFile = createWriteStream(distPath, 'utf-8');
    for (const file of files) {
      if (file.isFile){
        const pathToFile = path.join(styles, file.name);
        const fileExt = path.parse(pathToFile).ext;
        if (fileExt === '.css'){
          const fileSource = await readFile(pathToFile, 'utf-8');
          writeFile.write(`${fileSource}\n`);
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function bundleHTML(template, htmlBundle, components) {
  try {
    const data = await readFile(template);
    let res = data.toString();
    const tagsToChange = res.match(/{{(.*)}}/g);
    if (tagsToChange) {
      for await (const tagToChange of tagsToChange) {
        const fileName = tagToChange.slice(2).slice(0, -2);
        const file = `${fileName}.html`;
        const pathToFile = path.join(components, file);
        const fileData = await readFile(pathToFile);
        res = res.replace(tagToChange, fileData.toString());
      }
      await writeFile(htmlBundle, res);
    }
  } catch (err) {
    console.log(err.message);
  }
}

createPage();