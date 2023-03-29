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
 * @param {string} paginationUrl
 * @param {HTMLButtonElement} paginationBtn 
 * @param {string} elemHideClass
 * @returns {void}
 */
function togglePaginationBtnVisibility(paginationUrl, paginationBtn, elemHideClass) {
    if (paginationUrl === null) {
        return paginationBtn.classList.add(elemHideClass);
    }

    const btnElemHasHideClass = paginationBtn.classList.contains(elemHideClass);

    if (btnElemHasHideClass) {
        return paginationBtn.classList.remove(elemHideClass);
    }
}

/**
 * @param {"nextUrl"|"prevUrl"} type 
 * @returns {void}
 */
async function handlePaginationClick(type) {
    try {
        // Clear prev pokemon cards first
        removeChildElems(main);
        showLoader();

        const apiURL = pagination[type];
        const { pokemonData, paginationUrlNext, paginationUrlPrev } = await getPokemonData(apiURL);
        createAllPokemon(pokemonData);

        updatePaginationState(paginationUrlNext, paginationUrlPrev);
        togglePaginationBtnVisibility(paginationUrlNext, paginationNextBtn, paginationBtnHideClass);
        togglePaginationBtnVisibility(paginationUrlPrev, paginationPrevBtn, paginationBtnHideClass);

    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

/**
 * @param {string} nextURL 
 * @param {string} previousURL 
 * @returns {void}
 */
function updatePaginationState(nextURL, previousURL) {
    pagination.nextUrl = nextURL;
    pagination.prevUrl = previousURL;
}

// Event listeners
paginationNextBtn.addEventListener("click", () => handlePaginationClick("nextUrl"));
paginationPrevBtn.addEventListener("click", () => handlePaginationClick("prevUrl"));

export {
    paginationNextBtn,
    paginationPrevBtn,
    paginationBtnHideClass,
    togglePaginationBtnVisibility,
    updatePaginationState
};