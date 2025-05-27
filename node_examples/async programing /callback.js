
console.log("Starting the task...");
function doSomethingAsync(callback) {
  setTimeout(function () {
    console.log("Task completed!");
    callback();
  }, 1000);
}
function onComplete(error, data) {
  console.log("All tasks are done!");
}
doSomethingAsync(onComplete);