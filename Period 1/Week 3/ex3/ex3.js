const fetch = require('node-fetch');
var now = require("performance-now")
/*
3 Async functions in serial and in parallel
Execution in serial
Use fetch and async/await to complete fetchPerson(..)below. When implemented, each line in printNames() must be executed “sequentially”. Verify this with the debugger.
*/
const URL = "https://swapi.co/api/people/";

function fetchPerson(url) {
  try {
    return fetch(url).then(res => res.json())
  } catch (err) {
    console.log("Shiiit!");
  }
}
async function printNamesSequental() {
  console.log("Before");
  const person1 = await fetchPerson(URL + '1');
  const person2 = await fetchPerson(URL + '2');
  console.log(person1.name);
  console.log(person2.name)
  console.log("After all");
}

/*
With the previous design, HTTP requests were made sequentially and not in parallel. Since the second request does not require inputs from the first, this introduces an unnecessary performance overhead in the function (it blocks longer than it has to).
You will fix this problem in the next step. But first, let's measure time consumption, so we can see if it is a problem.
Use npm to install performance-now, and calculate the time spent in your sequential implementation using this example.


Execution in parallel
Fix the problem above, so that HTTP-requests are made in parallel.
Measure the time spent the same way as above, to convince yourself that; knowing how and when to perform request in serial or parallel is important.
*/
async function printNamesParallel() {
  console.log("Before");
  const person1 = fetchPerson(URL + '1');
  const person2 = fetchPerson(URL + '2');
  const res = await Promise.all([person1, person2]);
  console.log(res[0].name);
  console.log(res[1].name);
  console.log("After all");
}
printNamesParallel()
