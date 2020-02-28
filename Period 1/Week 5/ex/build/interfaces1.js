"use strict";
//b) Create a function that takes an IBook instance and test it with an object instance.
const printBook = (book) => console.log(JSON.stringify(book));
let a = {
    title: "hello",
    author: "Jimmy",
    published: new Date(Date.now()),
    pages: 1
};
printBook(a);
/*
c) Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.
The word duck typing is inspired by the saying:
if it walks like a duck and talks like a duck then it is a duck

Which means, if an object meets all of the requirements for a given interface, even tho it doesn't implement that interface,
then it can be used in functions which require that specific interface as a type.
*/
//f) Create a class Book and demonstrate the "Java way" of implementing an interface.
class Book {
    constructor(_title, _author, _published, _pages) {
        this._title = _title;
        this._author = _author;
        this._published = _published;
        this._pages = _pages;
        this.getPages = () => this._pages;
    }
    ;
    get title() { return this._title; }
    set title(title) { this._title = title; }
    get author() { return this._author; }
    get published() { return this._published; }
    set published(published) { this._published = published; }
    get pages() { return this._pages; }
    set pages(pages) { this._pages = pages; }
    //Java ugly way of getters n setters:
    getTitle() { return this._title; }
    setTitle(title) { this._title = title; }
    getAuthor() { return this._author; }
    getPublished() { this._published; }
    setPublished(published) { return this._published = published; }
    setPages(pages) { return this._pages = pages; }
}
let book = new Book("Bad Boys", "Will Smith", new Date(Date.now()), 52);
console.log(book.title);
book.title = "Good boys";
console.log(book.title);
console.log(book);
//# sourceMappingURL=interfaces1.js.map