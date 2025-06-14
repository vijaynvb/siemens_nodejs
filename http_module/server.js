// listening on port 3000
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => { 
    
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    // if(req.url === '/') {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end("root accessed");
    //     return;
    // }else if(req.url === '/about') {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end("about accessed");
    //     return;
    // } else if(req.url === '/contact') {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end("contact accessed");
    //     return;
    // }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`welcome ${parsedUrl.query.name}!\n`);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
