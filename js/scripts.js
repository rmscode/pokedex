// List of Pokemon and their stats
let pokemonList = [{
  name: 'Charmander',
  height: 0.6,
  weight: 8.5,
  type: ['fire']
},

{
  name: 'Charmeleon',
  height: 1.1,
  weight: 19,
  type: ['fire']
},

{
  name: 'Charizard',
  height: 1.7,
  weight: 90.5,
  type: ['fire', 'flying']
}
];

// Send list to DOM & notate large Pokemon
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1.5) {
    document.write(pokemonList[i].name + " [Height: " + pokemonList[i].height + "] " + "Wow, that’s big! " + "</br>")
  } else {
      document.write(pokemonList[i].name + " [Height: " + pokemonList[i].height + "] " + "</br>")
  }
}
