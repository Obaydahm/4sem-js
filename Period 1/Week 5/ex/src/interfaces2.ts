//Interfaces 2
//a) Create an interface to describe a function: myFunc that should take three string parameters and return a String Array.
interface ImyFunc {
  (a: string, b: string, c: string): string[];
}
//b) Design a function "implementing" this interface which returns an array with the three strings
let myFunc: ImyFunc = (a: string, b: string, c: string): string[] => {
  return [a, b, c]
}
//c) Design another implementation that returns an array, with the three strings uppercased.
let myFuncUpper: ImyFunc = (a: string, b: string, c: string): string[] => {
  return [a.toUpperCase(), b.toUpperCase(), c.toUpperCase()]
}
//d) The function, given below, uses the ES-6 (and TypeScript) feature for destructuring Arrays into individual variables, to simulate a method that uses the interface.
let f2 = function logger(f1: ImyFunc) {
  //Simulate that we get data from somewhere and uses the provided function
  let [a, b, c] = ["A", "B", "C"];
  console.log(f1(a, b, c));
}
//e) Test f2 with the two implementations created in b+c.
f2(myFunc)
f2(myFuncUpper)
//f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
let addNumbers = (a: number, b: number): number => {
  return a + b;
}

/*
f2(addNumbers)
Argument of type '(a: number, b: number) => number' is not assignable to parameter of type 'ImyFunc'.
  Types of parameters 'a' and 'a' are incompatible.
    Type 'string' is not assignable to type 'number'.ts(2345)
*/