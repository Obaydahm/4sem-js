//3) Using the Prototype property to add new functionality to existing objects
/*
Create a new version of the two functions (without the array argument) which you should add
to the Array prototype property so they can be called on any array as sketched below:

var names = ["Lars", "Peter", "Jan", "Bo"];
var newArray = names.myFilter(function(name) {…});
*/
var names = ["Lars", "Peter", "Jan", "Bo"];
const numbers = [1, 4, 9, 16];

Array.prototype.myFilter = function (callback) {
  let newArray = [];
  this.forEach(element => {
    if (callback(element)) newArray.push(element);
  });
  return newArray;
}

Array.prototype.myMap = function (callback) {
  let newArray = [];
  this.forEach(element => {
    newArray.push(callback(element))
  });
  return newArray;
}

console.log("myFilter:", names.myFilter((word) => (word.length > 3)))
console.log("myMap:", numbers.myMap((num) => num * 2))
