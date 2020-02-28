"use strict";
function logger(a, b) {
    console.log(`Value 1: ${a}, Value 2: ${b}`);
}
let a = 12;
let b = "Hello";
logger(a, b);
function loggerV2(a, b) {
    console.log(`Person: ${JSON.stringify(a)}, Address: ${b.address}`);
}
let person;
person = { name: "Bill" };
let address = { address: "Nørrebrogade" };
loggerV2(person, address);
class Person {
    constructor(_name) {
        this._name = _name;
    }
    ;
    get name() { return this._name; }
    set name(newName) {
        this._name = newName;
        console.log("setter used");
    }
}
let p = new Person("Kurt");
console.log(p.name);
p.name = "Hanne";
console.log(JSON.stringify(p));
function loggerV3(a, b) {
    console.log(`Val1: ${JSON.stringify(a)}, Val2: ${JSON.stringify(b)}`);
}
loggerV3(a, b);
console.log("////////////////////////////////////////////////////////////////////////////");
class GenericLogger {
    constructor() {
        this.log = (a, b) => console.log(`Val1: ${JSON.stringify(a)}, Val2: ${JSON.stringify(b)}`);
    }
}
const logger1 = new GenericLogger();
const logger2 = new GenericLogger();
logger1.log(a, b);
logger2.log(person, address);
let myNumber = [13];
let myString = ["13"];
let myBoolean = [true, false];
let p3 = { firstname: "kurt", phone: "123" };
//# sourceMappingURL=logger.js.map