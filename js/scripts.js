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
pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 1.5) {
    document.write('<p>' + pokemon.name + ' [Height: ' + pokemon.height + ']' + ' [Weight: ' + pokemon.weight + ']' + ' [Type: ' + pokemon.type + ']' + " Wow, that's big!" + '</p>')
  } else
    document.write('<p>' + pokemon.name + ' [Height: ' + pokemon.height + ']' + ' [Weight: ' + pokemon.weight + ']' + ' [Type: ' + pokemon.type + ']' + '</p>')
});
