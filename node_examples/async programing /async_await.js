
function myFunction() {
//   return new Promise((resolve, reject) => {
//       resolve("Hello, World!");
//   });
return Promise.resolve("Hello, World!");
}

async function myFunction1(){
    if(true)
      throw new Error("This is an error");
    return "hello from function 1"
}

myFunction1().then((result) => {
    console.log(result); // hello from function 1
}
).catch((error) => {
    console.error(error); // This is an error
});

async function myAsyncFunction() {
    await myFunction().then((result) => {
        console.log(result); // Hello, World!
    });
}