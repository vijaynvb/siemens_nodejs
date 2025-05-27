
function moreWork() {
  console.log("Doing more work...");
}

const fs = require("fs");
fs.readFile("./file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log