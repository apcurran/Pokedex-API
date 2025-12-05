import { handlePokemonCardClick } from "./PokemonPopup.js";

const form = document.querySelector(".home-form");
const searchInput = form.querySelector(".home-form-search");

form.addEventListener("submit", function getSinglePokemonSearch(event) {
    event.preventDefault();

    try {
        const lowerSearchValue = searchInput.value.trim().toLowerCase();

        if (!lowerSearchValue) {
            return;
        }

        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${lowerSearchValue}`;
        handlePokemonCardClick(apiUrl);
    } catch (err) {
        console.error(err);
    }
});
