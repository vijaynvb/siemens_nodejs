const https = require("node:https");
const ITERATIONS = 4;
const start = Date.now();
for (let i = 0; i < ITERATIONS; i++) {
  https
    .request("https://google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Request: ${i + 1} `, Date.now() - start);
      });
    })
    .end();
}