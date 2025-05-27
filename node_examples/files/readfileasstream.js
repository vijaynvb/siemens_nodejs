const fs = require('fs'); 

const stream = fs.createReadStream('./example.txt', { encoding: 'utf8' }); 

stream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
}
);
// eof is identified in the file 
stream.on('end', () => {
  console.log('Stream ended');
});