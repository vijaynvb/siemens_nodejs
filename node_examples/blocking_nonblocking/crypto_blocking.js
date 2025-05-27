// Blocking code
const crypto = require("node:crypto");
const iterations = 3;

const start = Date.now();

for (let i = 0; i < iterations; i++) {
  crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512"); // Any method with Sync keyword is blocking
        console.log("executionTime:", Date.now() - start);
}


