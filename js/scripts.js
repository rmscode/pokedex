// Array of Pokemon objects
let pokemonRepository = (function () {
  let pokemonList = [
  {
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
  // adds a pokemon to the list and checks that certain criteria is met
  function addv(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).every(pokemonStats => ['name', 'height', 'weight', 'type'].includes(pokemonStats)) && typeof pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      alert("Must add Pokemon as an object with the following values: name, height, weight, type.");
    }
  }

  // gets the pokemon list
  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // creates list of pokemon buttons
  function addListItem(pokemon) {
    let pokemonUL = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    pokemonListItem.appendChild(button);
    pokemonUL.appendChild(pokemonListItem);
    button.addEventListener('click', () => { showDetails(pokemon); });
  }

  return {
    addv: addv,
    getAll: getAll,
    addListItem: addListItem
  };

})();


// fills repository with pokemon and adds to DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
