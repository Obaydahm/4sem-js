/*
Generics        
a) Implement a generic function which will take an array of any kind, and return the array reversed 
(just use the built-in reverse function), so the three first calls below will print the reversed array, and the last call will fail.
console.log(reverseArr<string>(["a","b","c"]));
console.log(reverseArr<number>([1,2,3]));
console.log(reverseArr<boolean>([true,true,false]));
console.log(reverseArr<number>(["a","b","c"]));
*/
function reverseArr<T>(array: T[]) {
  return array.reverse();
}
console.log(reverseArr<string>(["a", "b", "c"]));
console.log(reverseArr<number>([1, 2, 3]));
console.log(reverseArr<boolean>([true, true, false]));
//console.log(reverseArr<number>(["a", "b", "c"]));

/*
b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:
let d = new DataHolder<string>("Hello");
console.log(d.getValue());
d.setValue("World");
console.log(d.getValue());

let d2 = new DataHolder<number>(123);
console.log(d2.getValue());
d2.setValue(500);
console.log(d2.getValue());
Verify that once created, an instance can only be used with the type it was created from.
*/
class DataHolder<T>{
  constructor(private _value: T) { }

  //c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods
  set value(val: T) { this._value = val; }
  get value() {
    return this._value;
  }

}

let d = new DataHolder<string>("Hello");
console.log(d.value);
d.value = "World";
console.log(d.value);

let d2 = new DataHolder<number>(123);
console.log(d2.value);
d2.value = 500;
console.log(d2.value);
