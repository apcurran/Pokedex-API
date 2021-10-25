import { PokemonCardsGrid } from "./PokemonCardsGrid.js";
import { Pagination } from "./Pagination.js";
import { Loader } from "./Loader.js";

// On page load
async function init() {
    const POKEMON_PER_PAGE = 50;
    const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}`;
    
    Loader.showLoader();

    // Get Pokemon data
    const { pokemonData, paginationUrlNext, paginationUrlPrev } = await PokemonCardsGrid.getPokemonData(apiEndpoint);
    // Create Pokemon cards
    PokemonCardsGrid.createAllPokemon(pokemonData);

    Loader.hideLoader();

    // Update pagination data
    Pagination.updatePaginationUrl("nextUrl", paginationUrlNext);
    Pagination.updatePaginationUrl("prevUrl", paginationUrlPrev);
}

init();