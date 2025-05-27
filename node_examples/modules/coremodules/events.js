const EventEmitter = require("events");

// Create a custom event emitter
class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();

// Register an event listener
myEmitter.on("myEvent", () => {
  console.log("Custom event emitted");
});
myEmitter.on("myEvent1", () => {
  console.log("Custom event1 emitted");
});

console.log("Event listeners registered");
// Emit the custom event
setTimeout(() => {
    myEmitter.emit("myEvent");
    myEmitter.emit("myEvent1");
}, 1000);