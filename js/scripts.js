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
  // adds a pokemon to the lsit
  // function add(pokemon) {
  //   pokemonList.push(pokemon);
  // }
  function addv(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null && Object.keys(pokemon).every(al +> ['name, 'height', 'weight, 'type].includes(el))) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid data is given.');
    }
  }


  // gets the pokemon list
  function getAll() {
    return pokemonList;
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
    // event listener: click
    button.addEventListener('click', () => { showDetails(pokemon); });
  }

  //
  showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();


// fills repository with pokemon and adds to DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
