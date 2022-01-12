import { PokemonCardsGrid } from "./PokemonCardsGrid.js";
import { showLoader, hideLoader } from "./Loader.js";
import { removeChildElems } from "./utils.js";

const Pagination = (() => {
    // Data
    let pagination = {
        nextUrl: "",
        prevUrl: ""
    };

    // DOM elem refs
    const paginationNextBtn = document.getElementById("pagination-controls__btn--next");
    const paginationPrevBtn = document.getElementById("pagination-controls__btn--prev");
    const main = document.querySelector(".main");

    function updatePaginationUrl(urlType, newUrl) {
        pagination[urlType] = newUrl;
    }

    function togglePaginationBtnVisibility() {
        if (pagination.nextUrl == null) {
            paginationNextBtn.classList.toggle("btn--hide");
        }

        if (pagination.prevUrl == null) {
            paginationPrevBtn.classList.toggle("btn--hide");
        }
    }

    async function handlePaginationClick(type) {
        try {
            // Clear prev pokemon cards first
            removeChildElems(main);

            showLoader();

            // Get new Pokemon data
            const { pokemonData, paginationUrlNext, paginationUrlPrev } = await PokemonCardsGrid.getPokemonData(pagination[type]);
            // Create Pokemon cards
            PokemonCardsGrid.createAllPokemon(pokemonData);

            // Update to new pagination data
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

    // Event listeners
    paginationNextBtn.addEventListener("click", () => handlePaginationClick("nextUrl"));
    paginationPrevBtn.addEventListener("click", () => handlePaginationClick("prevUrl"));

    return {
        updatePaginationUrl,
        togglePaginationBtnVisibility
    };
})();

export { Pagination };