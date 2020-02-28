//the reducer-method
/*
a) Use join to create a single string from all, with names: comma-, space. and  # - separated.
var all= ["Lars", "Peter", "Jan", "Bo"];
*/
var all = ["Lars", "Peter", "Jan", "Bo"];
console.log("comma:", all.join(","))
console.log("space:", all.join(" "))
console.log("hashtag:", all.join("#"))

/*
Now let’s create our own reducer functions (see here for info).
b) Given this array: var numbers = [2, 3, 67, 33];
Create a reducer function that will return the sum (105) of all values in numbers
*/
var numbers = [2, 3, 67, 33];

Array.prototype.myReducer = function (callback) {
  let accumulator;
  this.forEach(element => {
    if (!accumulator) {
      accumulator = element;
    } else {
      accumulator = callback(accumulator, element)
    }
  });
  return accumulator
}
console.log(numbers.myReducer((acc, curr) => acc + curr))

/*
c)  Given this array:
let members = [
 {name : "Peter", age: 18},
 {name : "Jan", age: 35},
 {name : "Janne", age: 25},
 {name : "Martin", age: 22},
]
Create a reducer function that will return the average age of all members.
*/
let members = [
  { name: "Peter", age: 18 },
  { name: "Jan", age: 35 },
  { name: "Janne", age: 25 },
  { name: "Martin", age: 22 },
]

Array.prototype.myReducer2 = function (callback) {
  let accumulator;
  this.forEach(element => {
    if (!accumulator) {
      accumulator = element.age;
    } else {
      accumulator = callback(accumulator, element.age)
    }
  });
  return accumulator / this.length
}
console.log(members.myReducer2((acc, curr) => acc + curr))

/*
d) Imagine you were to create a system that could count votes for the presidential election in USA.
Given this array of votes: 
Create a reduce function that will return a single object like {Clinton: 3, Trump: 4, None: 1 }
*/
var votes = ["Clinton", "Trump", "Clinton", "Clinton", "Trump", "Trump", "Trump", "None"];
function countVotes(array) {
  let countedVotes = {};
  array.forEach(element => {
    if (countedVotes[element])
      countedVotes[element]++
    else
      countedVotes[element] = 1
  });
  return countedVotes
}

console.log(countVotes(votes))