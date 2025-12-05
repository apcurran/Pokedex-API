import { handlePokemonCardClick } from "./PokemonPopup.js";

/** @type {HTMLElement} */
const main = document.querySelector(".main");
/** @type {HTMLTemplateElement} */
const pokemonCardTemplate = document.getElementById("pokemon-card-template");

// event delegation instead of a separate event listener on each card
main.addEventListener("click", function onPokemonGridCardSelect(event) {
    const card = event.target.closest(".main-card-btn-container");

    if (!card) {
        return;
    }

    const pokemonURL = card.dataset.url;
    handlePokemonCardClick(pokemonURL);
});

/**
 * @param {string} apiUrl
 * @returns {Promise}
 */
async function getPokemonData(apiUrl) {
    try {
        const pokemonGroupResponse = await fetch(apiUrl, {
            cache: "force-cache",
        });
        const pokemonGroupData = await pokemonGroupResponse.json();
        const pokemonDataArr = pokemonGroupData.results;

        return {
            pokemonData: pokemonDataArr,
            paginationUrlNext: pokemonGroupData.next,
            paginationUrlPrev: pokemonGroupData.previous,
        };
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {[]} pokemonDataArr
 * @returns {void}
 */
function renderPokemonCardsGrid(pokemonDataArr) {
    let containerFragment = document.createDocumentFragment();

    // batch add all card elems to container fragment
    for (let i = 0; i < pokemonDataArr.length; i++) {
        const card = createPokemonCard(pokemonDataArr[i], i);
        containerFragment.append(card);
    }

    // render all cards in one go
    main.replaceChildren(containerFragment);
}

/**
 * @param {object} pokemon
 * @param {number} index
 * @returns {[HTMLButtonElement, string]}
 */
function createPokemonCard(pokemon, index) {
    const { url, name } = pokemon;
    const pokeId = url.split("/").at(-2);
    const pokeNum = pokeId.padStart(3, "0");

    let clone = pokemonCardTemplate.content.cloneNode(true);
    const card = clone.querySelector(".main-card-btn-container");
    const img = clone.querySelector(".main-card-fig-img");
    const p = clone.querySelector(".main-card-content-num");
    const h2 = clone.querySelector(".main-card-content-name");

    card.dataset.url = url;
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
    img.loading = index > 11 ? "lazy" : "eager";
    p.textContent = `#${pokeNum}`;
    h2.textContent = name;

    return card;
}

export { getPokemonData, renderPokemonCardsGrid, createPokemonCard };
