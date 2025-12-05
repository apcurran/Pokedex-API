import { renderPokemonCardsGrid, getPokemonData } from "./PokemonCardsGrid.js";
import { showLoader, hideLoader } from "./Loader.js";

const paginationNextBtn = document.getElementById(
    "pagination-controls__btn--next",
);
const paginationPrevBtn = document.getElementById(
    "pagination-controls__btn--prev",
);
const paginationBtnHideClass = "btn--hide";
const main = document.querySelector(".main");

/**
 * Side-effects to DOM state here
 *
 * @param {string|null} nextURL
 * @param {string|null} previousURL
 * @returns {void}
 */
function updatePaginationUI(nextURL, previousURL) {
    // update data-url attribute (DOM now holds single source of state)
    paginationNextBtn.dataset.url = nextURL || "";
    paginationPrevBtn.dataset.url = previousURL || "";

    // update visibility of buttons to user
    paginationNextBtn.classList.toggle(
        paginationBtnHideClass,
        nextURL === null, // if nextURL is null (from API), add hide class
    );
    paginationPrevBtn.classList.toggle(
        paginationBtnHideClass,
        previousURL === null,
    );
}

/**
 * @param {HTMLButtonElement} buttonClicked
 * @returns {Promise<void>}
 */
async function handlePaginationClick(buttonClicked) {
    try {
        // Clear prev pokemon cards first
        main.replaceChildren();
        showLoader();

        const apiURL = buttonClicked.dataset.url;

        if (!apiURL) {
            return;
        }

        const { pokemonData, paginationUrlNext, paginationUrlPrev } =
            await getPokemonData(apiURL);
        renderPokemonCardsGrid(pokemonData);

        updatePaginationUI(paginationUrlNext, paginationUrlPrev);
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

paginationNextBtn.addEventListener("click", (event) =>
    handlePaginationClick(event.currentTarget),
);
paginationPrevBtn.addEventListener("click", (event) =>
    handlePaginationClick(event.currentTarget),
);

export { updatePaginationUI };
