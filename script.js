let pokeObjects = [];
const dsTopContainer = document.getElementById("top-ds-container");

async function load() {
  const localStorageValue = localStorage.getItem("storedPokeObjects");
  if (!localStorageValue) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=15");
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
});

async function displayPokeObject(id) {
  let pokemonCard = "";
  if (!pokeObjects[id - 1].detailedInfo) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pokemonCard = data;
    pokeObjects[id - 1].detailedInfo = pokemonCard;
    updateLocalStorage();
  } else {
    pokemonCard = pokeObjects[id - 1].detailedInfo;
  }
  //make a property on each pokeObject that holds html?? Maybe
  //multiple types on a pokemon requires mapping

  const pokemonCardHtml = `
  <div>${pokemonCard.name}
  ${pokemonCard.height}
  ${pokemonCard.weight}
  ${pokemonCard.types[0].type.name}
  <img src="${pokemonCard.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]["front_default"]}"/>
  </div>`;

  document.getElementById("bottom-ds-container").innerHTML = pokemonCardHtml;
}

//gets id, checks if info is in local storage object, then render or fetch/render
//in bottom of dex
//add button will be here rendered with pokemon ID

const addPokemonToCatch = (id) => {
  console.log(id);
};

//when added, pokemon object gets added to t0-catch array
//put into local storage

//pokemon class could probably make to render specific elements of pokemon information
//There is a button for clicking to add them to your "to catch"

//to catch list is an array holding info about pokemon, gets mapped to html
//button to move them to your caught list (your pc!!)

//pokedex style, grass/route style, computer/pc style for the respective sections
