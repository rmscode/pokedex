// IIFE start
// array of Pokemon objects
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // adds a pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // gets the pokemon list
  function getAll() {
    return pokemonList;
  }

  // generates & displays list of pokemon cards
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let $row = $('.row');
      // create a div container for the card
      let $card = $('<div class="card" style="width:400px"></div>');
      // creat image element for the card
      let $image = $('<img class="card-img" alt="Card image" style="width:20%" />');
      $image.attr('src', pokemon.imageUrl);
      // create div container for card body
      let $cardBody = $('<div class="card-body"></div>');
      // create title element for card body
      let $cardTitle = $("<h4 class='card-title pokemon__name' >" + pokemon.name + "</h4>");
      // create button for the card body
      let $seeDetails = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-container">See Details</button>');

      // append above creations to card & cardBody
      $row.append($card);
      $card.append($cardBody);
      $card.append($image);
      $cardBody.append($cardTitle);
      $cardBody.append($seeDetails);

      // event listner opens modal showing pokemon details on click
      $seeDetails.on('click', function (event) {
        showDetails(pokemon);
      });

    });
  }

  // displays pokemon's details when clicked via modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
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
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name)
      }
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name)
      }

    }).catch(function (e) {
      console.error(e);
    });
  }

  // shows modal content
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    modalTitle.empty();
    modalBody.empty();

    // create element for name in modal conent
    let nameElement = $('<h1 class="pokemon__name">' + item.name + '</h1>');
    // create img element in modal content
    let imageElement = $('<img class="modal-img" style="width:50">');
    imageElement.attr('src', item.imageUrl);
    // create element for height in modal content
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    // create element for weight in modal content
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
    // create element for types in modal content
    let typesElement = $('<p>' + 'Types : ' + item.types + '</p>');
    // create element for abilities in modal content
    let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities + '</p>');

    // appends above creations to modal modalBody
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    // logs modal to console
    console.log(item)
  }

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
