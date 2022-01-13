import { createAllPokemon, getPokemonData } from "./PokemonCardsGrid.js";
import { showLoader, hideLoader } from "./Loader.js";
import { removeChildElems } from "./utils.js";

// DOM elem refs
const paginationNextBtn = document.getElementById("pagination-controls__btn--next");
const paginationPrevBtn = document.getElementById("pagination-controls__btn--prev");
const paginationBtnHideClass = "btn--hide";
const main = document.querySelector(".main");

// Data
let pagination = {
    nextUrl: "",
    prevUrl: ""
};

/**
 * @param {string} urlType 
 * @param {string} newUrl 
 * @returns {string}
 */
function updatePaginationUrl(urlType, newUrl) {
    return pagination[urlType] = newUrl;
}

/**
 * @param {string} paginationUrl
 * @param {HTMLElement} paginationBtn 
 * @param {string} elemHideClass 
 */
function togglePaginationBtnVisibility(paginationUrl, paginationBtn, elemHideClass) {
    // Check if pagination URL is null
    if (!paginationUrl) {
        // If pagination URL is null, then add the "btn--hide" class to elem and exit early
        return paginationBtn.classList.add(elemHideClass);
    }

    const btnElemHasHideClass = paginationBtn.classList.contains(elemHideClass);

    if (btnElemHasHideClass) {
        // Remove "btn--hide" class to make btn visible
        return paginationBtn.classList.remove(elemHideClass);
    }

    // Return (do nothing) to keep UI btn visible
    return;
}

async function handlePaginationClick(type) {
    try {
        // Clear prev pokemon cards first
        removeChildElems(main);
        showLoader();

        // Get new Pokemon data
        const { pokemonData, paginationUrlNext, paginationUrlPrev } = await getPokemonData(pagination[type]);
        // Create Pokemon cards
        createAllPokemon(pokemonData);

        // Update pagination btn state and UI
        updatePaginationUrl("nextUrl", paginationUrlNext);
        togglePaginationBtnVisibility(pagination.nextUrl, paginationNextBtn, paginationBtnHideClass);
        updatePaginationUrl("prevUrl", paginationUrlPrev);
        togglePaginationBtnVisibility(pagination.prevUrl, paginationPrevBtn, paginationBtnHideClass);

    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

// Event listeners
paginationNextBtn.addEventListener("click", () => handlePaginationClick("nextUrl"));
paginationPrevBtn.addEventListener("click", () => handlePaginationClick("prevUrl"));

export {
    paginationNextBtn,
    paginationPrevBtn,
    paginationBtnHideClass,
    updatePaginationUrl,
    togglePaginationBtnVisibility
};