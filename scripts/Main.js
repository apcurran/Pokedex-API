import { getPokemonData, createAllPokemon } from "./PokemonCardsGrid.js";
import { updatePaginationUrl, togglePaginationBtnVisibility } from "./Pagination.js";
import { showLoader, hideLoader } from "./Loader.js";

// On page load
async function init() {
    try {
        const POKEMON_PER_PAGE = 50;
        const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}`;
        
        showLoader();
    
        // Get Pokemon data
        const { pokemonData, paginationUrlNext, paginationUrlPrev } = await getPokemonData(apiEndpoint);
        // Create Pokemon cards
        createAllPokemon(pokemonData);
    
        // Update pagination data
        updatePaginationUrl("nextUrl", paginationUrlNext);
        togglePaginationBtnVisibility();
        updatePaginationUrl("prevUrl", paginationUrlPrev);
        togglePaginationBtnVisibility();
        
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

init();