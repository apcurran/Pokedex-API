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
 * @param {HTMLButtonElement} paginationBtn 
 * @param {string} elemHideClass
 * @returns {void}
 */
function togglePaginationBtnVisibility(paginationUrl, paginationBtn, elemHideClass) {
    if (!paginationUrl) {
        // hide button
        return paginationBtn.classList.add(elemHideClass);
    }

    const btnElemHasHideClass = paginationBtn.classList.contains(elemHideClass);

    if (btnElemHasHideClass) {
        // make button visible
        return paginationBtn.classList.remove(elemHideClass);
    }
}

/**
 * @param {string} type 
 * @returns {void}
 */
async function handlePaginationClick(type) {
    try {
        // Clear prev pokemon cards first
        removeChildElems(main);
        showLoader();

        const { pokemonData, paginationUrlNext, paginationUrlPrev } = await getPokemonData(pagination[type]);
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