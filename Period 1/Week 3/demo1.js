const promiseDemo = (msg, delay, makeError) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const err = (Math.random() * 10) < 10
    if (makeError && err) {
      return reject(new Error("UPPPS"))
    }
    return resolve(msg.toUpperCase());
  }, delay);
})
