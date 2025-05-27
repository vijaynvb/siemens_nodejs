const os = require('os');
//import os from 'os'; // Using ES6 import syntax

console.log('Operating System Information:');
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPU Count: ${os.cpus().length}`);
console.log(`Total Memory: ${os.totalmem() / (1024 * 1024)} MB`);
console.log(`Free Memory: ${os.freemem() / (1024 * 1024)} MB`);
console.log(`Home Directory: ${os.homedir()}`);
console.log(`Temporary Directory: ${os.tmpdir()}`);
console.log(`Network Interfaces: ${JSON.stringify(os.networkInterfaces(), null, 2)}`);
console.log(`Uptime: ${os.uptime()} seconds`);
console.log(`Release: ${os.release()}`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Endianness: ${os.endianness()}`);
console.log(`Load Average: ${os.loadavg().join(', ')}`);
console.log(`User Info: ${JSON.stringify(os.userInfo(), null, 2)}`);