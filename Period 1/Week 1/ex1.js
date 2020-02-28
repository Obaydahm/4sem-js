//2) Implement user defined functions that take callbacks as an argument
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const numbers = [1, 4, 9, 16];
/*
a)  Implement a function: myFilter(array, callback)that takes an array as the first argument, 
    and a callback as the second and returns a new (filtered) array according to the code provided in 
    the callback (that is with the same behaviour as the original filter method).
    Test the method with the same array and callback as in the example with the original filter method.
*/
function myFilter(array, callback) {
  let newArray = [];
  array.forEach(element => {
    if (callback(element)) newArray.push(element);
  });
  return newArray;
}

/*
b)  Implement a function: myMap(array, callback)that, provided an array and a callback, 
    provides the same functionality as calling the existing map method on an array.
    Test the method with the same array and callback as in the example with the original map method.
*/
function myMap(array, callback) {
  let newArray = [];
  array.forEach(element => {
    newArray.push(callback(element))
  });
  return newArray;
}

console.log("myFilter:", myFilter(words, (word) => (word.length > 6)))
console.log("myMap:", myMap(numbers, (num) => num * 2))