const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// myEmitter.on("dataEvent", (data) => {
//   console.log("Received data:", data);
// });
myEmitter.once("dataEvent", (data) => {
  console.log("Received data:", data);
});

myEmitter.emit("dataEvent", { message: "Hello, World!" });
myEmitter.emit("dataEvent", { message: "Hello, World1!" });
myEmitter.emit("dataEvent", { message: "Hello, World2!" });