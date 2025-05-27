const fs = require('fs');

fs.writeFileSync('./example.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File created successfully');
  }
}
);