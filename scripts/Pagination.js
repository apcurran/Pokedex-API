import { PokemonCardsGrid } from "./PokemonCardsGrid.js";
import { Loader } from "./Loader.js";
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

        if (pagination.nextUrl == null) {
            showNextPaginationBtn(false);
        } else {
            showNextPaginationBtn(true);
        }

        if (pagination.prevUrl == null) {
            showPrevPaginationBtn(false);
        } else {
            showPrevPaginationBtn(true);
        }
    }

    function showPrevPaginationBtn(status) {
        if (status) {
            paginationPrevBtn.classList.remove("btn--hide");
        } else {
            paginationPrevBtn.classList.add("btn--hide");
        }
    }

    function showNextPaginationBtn(status) {
        if (status) {
            paginationNextBtn.classList.remove("btn--hide");
        } else {
            paginationNextBtn.classList.add("btn--hide");
        }
    }

    async function handlePaginationClick(type) {
        try {
            // Clear prev pokemon cards first
            removeChildElems(main);
    
            Loader.showLoader();
            
            // Get new Pokemon data
            const { pokemonData, paginationUrlNext, paginationUrlPrev } = await PokemonCardsGrid.getPokemonData(pagination[type]);
            // Create Pokemon cards
            PokemonCardsGrid.createAllPokemon(pokemonData);
    
            // Update to new pagination data
            updatePaginationUrl("nextUrl", paginationUrlNext);
            updatePaginationUrl("prevUrl", paginationUrlPrev);
            
        } catch (err) {
            console.error(err);
        } finally {
            Loader.hideLoader();
        }
    }

    // Event listeners
    paginationNextBtn.addEventListener("click", () => handlePaginationClick("nextUrl"));
    paginationPrevBtn.addEventListener("click", () => handlePaginationClick("prevUrl"));

    return {
        updatePaginationUrl
    };
})();

export { Pagination };