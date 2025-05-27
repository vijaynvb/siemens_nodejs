const crypto = require("node:crypto");
const iterations = 3;

const start = Date.now();
for (let i = 0; i < iterations; i++) {
  crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
    // No sync keyword says its asynchronous
    console.log("Hashed");
    console.log("executionTime:", Date.now() - start);
  });
}