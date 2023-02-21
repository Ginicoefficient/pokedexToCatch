let pokeObjects = [];
const dsTopContainer = document.getElementById("top-ds-container");

async function load() {
  if (!localStorage.getItem("storedPokemonOjbects")) {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=150"
    );
    const data = await response.json();

    pokeObjects = data.results;
  } else {
    let pokeObjects = JSON.parse(localStorage.getItem("storedPokemonObjects"));
    JSON.stringify(pokeObjects);
  }
  pokemonSelectorList();
}
load();

//run after updating pokeObject
function updateLocalStorage() {
  localStorage.setItem("storedPokemonObjects", JSON.stringify(pokeObjects));
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
  if (e.target.dataset.id) {
    console.log(e.target);
    //run function that grabs id of target, fetches pokemon info/caches
    //send e.target.dataset.id to the function for id string
  }
});

const displayPokeObject = (id) => {
  //gets id, checks if info is in local storage object, then render or fetch/render
  //in bottom of dex
  //add button will be here rendered with pokemon ID
};

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
