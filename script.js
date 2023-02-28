let pokeObjects = [];
let catchList = [];
let caughtList = [];
const dsTopContainer = document.getElementById("top-ds-container");

async function load() {
  const localStorageValue = localStorage.getItem("storedPokeObjects");
  if (!localStorageValue) {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=151"
    );
    const data = await response.json();
    pokeObjects = data.results;
  } else {
    pokeObjects = JSON.parse(localStorage.getItem("storedPokeObjects"));
  }
  pokemonSelectorList();
}
load();

//run after updating pokeObject
function updateLocalStorage() {
  localStorage.setItem("storedPokeObjects", JSON.stringify(pokeObjects));
}

function pokemonSelectorList() {
  //map array onto html array, join, set inner html of pokedex
  //divs with pokemon name and id
  const selectorHtml = pokeObjects
    .map((pokemon, index) => {
      return `
        <div class="single-dex-entry" data-id="${index + 1}" id="${index + 1}">
            <div class="pokemon-id" data-id="${index + 1}">${index + 1}</div>
            <div class="pokemon-name" data-id="${index + 1}">${
        pokemon["name"]
      }</div>
        </div>`;
    })
    .join("");
  dsTopContainer.innerHTML = selectorHtml;
}

//event listener looking for clicks (generally)
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("single-dex-entry") ||
    e.target.parentElement.classList.contains("single-dex-entry")
  ) {
    displayPokeObject(e.target.dataset.id);
  }
  if (e.target.classList.contains("add-btn")) {
    addPokemonToCatchList(e.target.id);
  }
});

async function displayPokeObject(id) {
  let pokemonCard = "";
  //if there's no specific info about pokemon in local storage, fetch & store
  if (!pokeObjects[id - 1].abilities) {
    const [response1, response2] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    const specificInfo = await response1.json();
    const speciesInfo = await response2.json();

    pokemonCard = {
      ...specificInfo,
      ...speciesInfo["flavor_text_entries"][0],
    };
    pokeObjects[id - 1] = pokemonCard;
    updateLocalStorage();
  } else {
    pokemonCard = pokeObjects[id - 1];
  }

  //use info from fetch or local storage to render info about the selecte mon
  const pokemonCardHtml = `
  <div class="pkm-card">
    <div class="pkm-card-hdr pixel-corners">
        <h3>${pokemonCard.name}</h3>
        <div><img class="pokemon-img" src="${pokemonCard.sprites.versions["generation-iii"]["emerald"]["front_default"]}"/></div></div>
    <hr class="divider">
    <div class="pkm-card-body pixel-corners">
        <div class="pkm-card-flavortext">${pokemonCard.flavor_text}</div>
    </div>
    <hr class="divider">
    <div class="pkm-card-footer">
      <div class="pokemon-physical-details"> Height: ${pokemonCard.height}in / 
        Weight: ${pokemonCard.weight}lb / 
        Type: ${pokemonCard.types[0].type.name}</div>
      <div><i class="fa-solid fa-plus btn add-btn" id=${pokemonCard.id}></i></div></div>
    </div>`;

  document.getElementById("bottom-ds-container").innerHTML = pokemonCardHtml;
}

const addPokemonToCatchList = (id) => {
  catchList.push(pokeObjects[id - 1]);
  console.log(catchList.length);
  renderCatchList();
};

//render catch list into the two right columns

function renderCatchList() {
  const htmlString = catchList
    .map((pokemon) => {
      console.log(pokemon);
      return `
    <div class="pkm-card-hdr pixel-corners">
        <h3>${pokemon.name}</h3>
    </div>`;
    })
    .join("");
  document.getElementById("catch-list").innerHTML = htmlString;
}

//helper function that removes from catch list, adds to caught list
//and re-renders both
