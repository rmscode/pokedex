// IIFE start
// array of Pokemon objects
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container');

  // adds a pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // gets the pokemon list
  function getAll() {
    return pokemonList;
  }

  // generates & displays list of pokemon buttons
  function addListItem(pokemon) {
    let pokemonUL = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    pokemonListItem.appendChild(button);
    pokemonUL.appendChild(pokemonListItem);

    button.addEventListener('click', () => {
      showDetails(pokemon,);
    });
  }

  // fetches pokemon data from pokeapi
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // fetches pokemon's stats (details)
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // displays pokemon's details when clicked via modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

// creates modal
function showModal(item) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modalContainer.classList.add('is-visible');

  // creates modal "close" button
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // creates title containing pokemon's name
  let titleElement = document.createElement('h1');
  titleElement.innerText = item.name;

  // creates image of pokemon
  let imgElement = document.createElement('img');
  imgElement.setAttribute ("src", item.imageUrl);

  // creates height stat info of pokemon
  let heightElement = document.createElement('p');
  heightElement.innerText = item.height;

  // appends the above creations to modalContainer
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(imgElement);
  modal.appendChild(heightElement);
  modalContainer.appendChild(modal);

  // logs modal to console
  console.log(item)
}

// hides modal
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

// exits modal when the escape key is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

// exits modal when clicking outside of modal
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})(); //IIFE end

// fills repo with pokemonapi data
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
