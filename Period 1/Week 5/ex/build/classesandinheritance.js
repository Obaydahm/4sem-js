"use strict";
/*
Classes and Inheritance
ES2015 and ES-next have added classes and inheritance to JavaScript somehow (but ONLY somehow) similar to what we know from Java.
      Alternative to this exercise: If you come to like the functional style of programming, you could implement this example using Type Aliases as explained by Hejlsberg in his video (43min)
TypeScript, however, adds a lot of extras to this topic, which this exercise should demonstrate. Make sure to observe the following:
A top-level interface IShape, to define the Shape class.
The constructor shorthand to automatically create properties
All of the Access Modifiers public, private, protected (and perhaps also readonly)
Abstract
Static (make a counter that counts the total number of instances)

A) The declaration below defines a Shape class,
which as it's only properties has a color field +  a getArea() and a getPerimeter() function which both returns undefined.
This is the closest we get to an abstract method in Java.

Provide the class with a nice (using template literals) toString() method  + a getter/setter for the colour property.

*/
class Shape {
    constructor(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    set color(newColor) {
        this._color = newColor;
    }
    toString() {
        return `The shape is ${this._color}`;
    }
}
/*
Verify that you cannot (why) make an instance of this class.
let square = new Shape("red");
error: Cannot create an instance of an abstract class.

Answer:
Since Shape is an abstract class, it is not possible to make an instance of it,
because the constructor can only be invoked by a class which extends the abstract class.
In other words: Abstract classes can only be extended/subclassed.
*/
//B) Create a new class Circle that should extend the Shape class.
class Circle extends Shape {
    constructor(_color, _radius) {
        super(_color);
        this._radius = _radius;
    }
    get radius() {
        return this._radius;
    }
    set radius(newRadius) {
        this._radius = newRadius;
    }
    get area() {
        return Math.PI * Math.pow(this._radius, 2);
    }
    get perimeter() {
        return 2 * this._radius * Math.PI;
    }
    toString() {
        return `The circle is of color ${this.color} and the radius is ${this.radius}.`;
    }
}
/*
Test the class constructor, the getters/setters and the three methods.
let circle = new Circle("Red", 10);
console.log(circle)
console.log("Color:",circle.color)
console.log("Radius:",circle.radius)
console.log("Area:",circle.area)
console.log("Perimeter:",circle.perimeter)
console.log(circle.toString())
*/
/*
C) Create a new class Cylinder (agreed, definitely not a perfect inheritance example) that should extend the Circle class.
Provide the class with:
A height field
A constructor that takes colour, radius and height.
Overwritten versions of relevant methods defined in the Base (getter for perimeter should throw "not implemented")
A getVolume() method  (or better, a getter called volume)
Getter/Setter for height

*/
class Cylinder extends Circle {
    constructor(_color, _radius, _height) {
        super(_color, _radius);
        this._height = _height;
    }
    get height() {
        return this._height;
    }
    set height(newHeight) {
        this._height = newHeight;
    }
    get area() {
        return Math.PI * Math.pow(this.radius, 2) * (this.radius + this._height);
    }
    get perimeter() {
        throw new Error("not implemented");
    }
    get volume() {
        return this._height * Math.PI * Math.pow(this.radius, 2);
    }
    toString() {
        return `The cylinder has a height of ${this._height} and is of color ${this.color} and the radius is ${this.radius}.`;
    }
}
let cylinder = new Cylinder("Red", 10, 5);
console.log(cylinder);
console.log("Color:", cylinder.color);
console.log("Radius:", cylinder.radius);
console.log("Area:", cylinder.area);
console.log("Volume:", cylinder.volume);
console.log(cylinder.toString());
try {
    console.log(cylinder.perimeter);
}
catch (e) {
    console.log("Perimeter:", e.message);
}
//# sourceMappingURL=classesandinheritance.js.map