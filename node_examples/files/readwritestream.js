const fs = require('fs'); 

const readStream = fs.createReadStream('./example.txt', { encoding: 'utf8' }); 
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf8' }); 

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
  readStream.pause(); // Pause the read stream to control flow
  setTimeout(() => {
  writeStream.write(chunk);
  }, 1000); // Simulate a delay of 1 second before writing
});

writeStream.on('drain', () => {
  console.log('Write stream is ready to accept more data');
  // You can continue writing more data here if needed
  // For example, you could read more data from the read stream 
    readStream.resume();
});

// eof is identified in the file 
readStream.on('end', () => {
  console.log('Stream ended');
  writeStream.end();
});

// upload file to server