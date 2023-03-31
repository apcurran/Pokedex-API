import { handlePokemonCardClick } from "./PokemonPopup.js";

const form = document.querySelector(".home-form");
const searchInput = form.querySelector(".home-form-search");

async function getSinglePokemonSearch() {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.value}`;
        handlePokemonCardClick(apiUrl);
        
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    getSinglePokemonSearch();
});
