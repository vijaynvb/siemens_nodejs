function moreWork() {
  console.log("Doing more work...");
}
const fs = require("fs");
const data = fs.readFileSync("./file.md"); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log