//import path from 'path';
const path = require('path');

console.log(__dirname + " and " + __filename);
//console.log(path.dirname)
const filePath = path.join('user', 'local', 'bin', 'file.txt');
console.log(`File Path: ${filePath}`);
const fileName = path.basename(filePath);
console.log(`File Name: ${fileName}`);
const dirName = path.dirname(filePath);
console.log(`Directory Name: ${dirName}`);
const extName = path.extname(filePath);
console.log(`File Extension: ${extName}`);
const absolutePath = path.resolve('user', 'local', 'bin', 'file.txt');
console.log(`Absolute Path: ${absolutePath}`);
const relativePath = path.relative('user/local', 'user/local/bin/file.txt');
console.log(`Relative Path: ${relativePath}`);
const parsedPath = path.parse(filePath);
console.log(`Parsed Path: ${JSON.stringify(parsedPath, null, 2)}`);
const normalizedPath = path.normalize('user//local/bin/../file.txt');