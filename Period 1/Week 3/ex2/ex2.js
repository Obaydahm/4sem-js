//2 Chaining promises (fetch requests), and why GraphQL is cool ;-)
const fetch = require('node-fetch')
const URL = "https://swapi.co/api/";
/*
Enter this URL in your browser: https://swapi.co/api/people/1/
Use information from this link to find the first movie in which  Luke Skywalker  appeared
Use information from this link to find the first species, which appeared in this movie
Use information from this link to find the planet (homeworld) for this species

a) with plain promises
Now, Implement a method getPlanetforFirstSpeciesInFirstMovieForPerson(id){} which for id = 1 (Luke Skywalker) should log this info:
Name: Luke Skywalker
First film: The Empire Strikes Back
First species: Yoda's species
Homeworld for Specie: unknown
*/
const getCharactorInfoPlainPromise = (id) => {
  const info = {};
  fetch(`${URL}people/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("Name:", data.name)
      fetch(data.films[0])
        .then(res => res.json())
        .then(data => {
          console.log("First film:", data.title)
          fetch(data.species[0])
            .then(res => res.json())
            .then(data => {
              console.log("First species", data.name)
              fetch(data.homeworld)
                .then(res => res.json())
                .then(data => console.log(data.name))
            });
        });
    });
}
//getCharactorInfoPlainPromise(1);

const getCharactorInfoAsync = async (id) => {
  try {
    const person = await fetch(`${URL}people/${id}`).then(res => res.json());
    const firstFilm = await fetch(person.films[0]).then(res => res.json());
    const firstSpecie = await fetch(firstFilm.species[0]).then(res => res.json());
    const homeworld = await fetch(firstSpecie.homeworld).then(res => res.json());

    console.log("Name:", person.name);
    console.log("First film:", firstFilm.title);
    console.log("First species", firstSpecie.name);
    console.log("Homeworld:", homeworld.name);
  } catch (err) {
    console.log("Shit!")
  } finally {
    ("Done.")
  }
}

getCharactorInfoAsync(1);