const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = false;
    if (success) {
      resolve("Success!");
    } else {
      reject("Error!");
    }
  }, 1000);
});

myPromise
  .then((result) => {
    console.log(result); // Success!
  })
  .catch((error) => {
    console.error(error); // Error!
  });