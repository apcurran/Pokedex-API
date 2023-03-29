import { getPokemonData, createAllPokemon } from "./PokemonCardsGrid.js";
import { paginationNextBtn, paginationPrevBtn, paginationBtnHideClass, updatePaginationUrl, togglePaginationBtnVisibility } from "./Pagination.js";
import { showLoader, hideLoader } from "./Loader.js";

/**
 * @returns {void}
 */
async function init() {
    try {
        const POKEMON_PER_PAGE = 50;
        const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}`;
        
        showLoader();
        const { pokemonData, paginationUrlNext, paginationUrlPrev } = await getPokemonData(apiEndpoint);
        createAllPokemon(pokemonData);
    
        // Update pagination data
        const paginationNextUrl = updatePaginationUrl("nextUrl", paginationUrlNext);
        togglePaginationBtnVisibility(paginationNextUrl, paginationNextBtn, paginationBtnHideClass);
        const paginationPrevUrl = updatePaginationUrl("prevUrl", paginationUrlPrev);
        togglePaginationBtnVisibility(paginationPrevUrl, paginationPrevBtn, paginationBtnHideClass);
        
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

init();