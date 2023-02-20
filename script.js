import { pokemonArray } from "./data.js";
const dsTopContainer = document.getElementById("top-ds-container");
const getPokemonBtn = document.getElementById("get-pokemon-btn");

//just doing this so the fetch won't happen until I click a button
// getPokemonBtn.addEventListener("click", function () {
//   fetch("https://pokeapi.co/api/v2/pokemon/1", { cache: "force-cache" })
//     .then((res) => res.json())
//     .then((data) => {
//       pokemonData = data;
//       console.log(pokemonData);

//       document.getElementById(
//         "app-container"
//       ).innerHTML += `<div class="image-container">
//             <img src="${pokemonData.sprites.versions["generation-iii"]["emerald"].front_default}" />
//         </div>`;
//     });
// });

function pokemonSelectorList() {
  //map array onto html array, join, set inner html of pokedex
  //divs with pokemon name and id
  const selectorHtml = pokemonArray
    .map((pokemon, index) => {
      return `
        <div class="single-dex-entry" id="${index + 1}">
            <div class="pokemon-id">${index + 1}</div>
            <div class="pokemon-name">${pokemon.name}</div>
        </div>`;
    })
    .join("");
  dsTopContainer.innerHTML = selectorHtml;
}

pokemonSelectorList();

//pokemon class could probably make to render specific elements of pokemon information
//secondary screen - when you click on a pokemon it fetches their information in detail
//and displays there. There is a button for clicking to add them to your "to catch"

//to catch list is an array holding info about pokemon, gets mapped to html
//button to move them to your caught list (your pc!!)

//pokedex style, grass/route style, computer/pc style for the respective sections
