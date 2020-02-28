function logger(a: number, b: string) {
  console.log(`Value 1: ${a}, Value 2: ${b}`)
}

let a = 12
let b = "Hello"
logger(a, b)

interface IPerson { name: string }
interface IAddress { address: string }

function loggerV2(a: IPerson, b: IAddress) {
  console.log(`Person: ${JSON.stringify(a)}, Address: ${b.address}`)
}

let person: IPerson;
person = { name: "Bill" }
let address = { address: "Nørrebrogade" }
loggerV2(person, address)

class Person implements IPerson {
  constructor(private _name: string) { };
  get name() { return this._name }
  set name(newName: string) {
    this._name = newName;
    console.log("setter used")
  }
}

let p = new Person("Kurt");
console.log(p.name)
p.name = "Hanne"
console.log(JSON.stringify(p))

function loggerV3<T, U>(a: T, b: U) {
  console.log(`Val1: ${JSON.stringify(a)}, Val2: ${JSON.stringify(b)}`)
}

loggerV3<number, string>(a, b)
console.log("////////////////////////////////////////////////////////////////////////////")
class GenericLogger<T, U>{
  log = (a: T, b: U) => console.log(`Val1: ${JSON.stringify(a)}, Val2: ${JSON.stringify(b)}`)
}

const logger1 = new GenericLogger<number, string>();
const logger2 = new GenericLogger<IPerson, IAddress>();

logger1.log(a, b);
logger2.log(person, address);

let myNumber: Array<number> = [13]
let myString: Array<string> = ["13"]
let myBoolean: Array<boolean> = [true, false]

//Optional fields in classes is made by adding a "?" after the name
interface IPersonV2 { firstname: string, phone?: string }
let p3: IPersonV2 = { firstname: "kurt", phone: "123" }
