const crypto = require('crypto');
//1 Wrap a callback implementation in a promise based implementation
var SIZE = 48;
const obj = {
  title: "6 Secure Randoms",
  randoms: []
};

//a) First implement the functionality without promises, using callbacks.
/*
crypto.randomBytes(SIZE, (err, buffer) => {
  if (err) return console.log(err)
  obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
  SIZE -= 8;
  crypto.randomBytes(SIZE, (err, buffer) => {
    obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
    SIZE -= 8;
    crypto.randomBytes(SIZE, (err, buffer) => {
      obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
      SIZE -= 8;
      crypto.randomBytes(SIZE, (err, buffer) => {
        obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
        SIZE -= 8;
        crypto.randomBytes(SIZE, (err, buffer) => {
          obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
          SIZE -= 8;
          crypto.randomBytes(SIZE, (err, buffer) => {
            obj.randoms.push({ length: SIZE, random: buffer.toString("hex") })
            console.log(obj)
          });
        });
      });
    });
  });
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////

//b) Use Promises to solve the problem.
/*
Create a function makeSecureRandom(size) that returns a promise,
using the callback based design,provided by the randomBytes(..) method.
Since the result from one calculation does not influence the
next (only order matters), use Promise.all(..) to execute the operations in parallel.
*/

const makeSecureRandom = (size) => new Promise((resolve, reject) => {
  crypto.randomBytes(size, function (err, buffer) {
    if (err) return reject(err);
    return resolve({ length: size, random: buffer.toString("hex") });
  })
});

module.exports = makeSixRandoms;
async function makeSixRandoms() {
  const p1 = makeSecureRandom(48);
  const p2 = makeSecureRandom(40);
  const p3 = makeSecureRandom(32);
  const p4 = makeSecureRandom(24);
  const p5 = makeSecureRandom(16);
  const p6 = makeSecureRandom(8);
  return await Promise.all([p1, p2, p3, p4, p5, p6]);
}