console.log("first line of code");
setTimeout(() => {
  console.log("second line of code");
}
, 1000);
console.log("third line of code"); // This is non-blocking, will run after the current call stack is cleared