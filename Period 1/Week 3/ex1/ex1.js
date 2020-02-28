const makeSixRandoms = require("./ex1-crypto-module")
/*
//1 Wrap a callback implementation in a promise based implementation
d) Create a new file and test the module, like so:
First, using plain promises
*/
makeSixRandoms().then(d => console.log(d))
//after that, using async/await

const SixRandoms = async () => {
  const randoms = await makeSixRandoms()
  randoms.forEach(element => {
    console.log("async/await:", element)
  });
}
SixRandoms()