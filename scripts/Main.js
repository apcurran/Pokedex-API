import { getPokemonData, renderPokemonCardsGrid } from "./PokemonCardsGrid.js";
import { updatePaginationUI } from "./Pagination.js";
import { showLoader, hideLoader } from "./Loader.js";

/**
 * @returns {Promise<void>}
 */
async function init() {
    try {
        const POKEMON_PER_PAGE = 50;
        const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${POKEMON_PER_PAGE}`;

        showLoader();

        const { pokemonData, paginationUrlNext, paginationUrlPrev } =
            await getPokemonData(apiEndpoint);
        renderPokemonCardsGrid(pokemonData);

        updatePaginationUI(paginationUrlNext, paginationUrlPrev);
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

init();
