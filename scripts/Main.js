import { getPokemonData, createAllPokemon } from "./PokemonCardsGrid.js";
import {
    paginationNextBtn,
    paginationPrevBtn,
    paginationBtnHideClass,
    togglePaginationBtnVisibility,
    updatePaginationState,
} from "./Pagination.js";
import { showLoader, hideLoader } from "./Loader.js";

/**
 * @returns {void}
 */
async function init() {
    try {
        const POKEMON_PER_PAGE = 50;
        const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${POKEMON_PER_PAGE}`;

        showLoader();
        const { pokemonData, paginationUrlNext, paginationUrlPrev } =
            await getPokemonData(apiEndpoint);
        createAllPokemon(pokemonData);

        updatePaginationState(paginationUrlNext, paginationUrlPrev);
        togglePaginationBtnVisibility(
            paginationUrlNext,
            paginationNextBtn,
            paginationBtnHideClass,
        );
        togglePaginationBtnVisibility(
            paginationUrlPrev,
            paginationPrevBtn,
            paginationBtnHideClass,
        );
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

init();
