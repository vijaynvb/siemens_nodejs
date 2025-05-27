const http = require('http'); 

const options = {
  hostname:'jsonplaceholder.typicode.com',
  path: '/users',
  method: 'GET'
};

const request = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

request.on('error', (error) => {
  console.error('Error:', error);
});

request.end();