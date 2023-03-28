import { handlePokemonCardClick, createPokemonCardPopup } from "./PokemonPopup.js";

/** @type {HTMLElement} */
const main = document.querySelector(".main");

async function getPokemonData(apiUrl) {
    try {
        const pokemonGroupResponse = await fetch(apiUrl, { cache: "force-cache" });
        const pokemonGroupData = await pokemonGroupResponse.json();
        const pokemonDataArr = pokemonGroupData.results;

        return {
            pokemonData: pokemonDataArr,
            paginationUrlNext: pokemonGroupData.next,
            paginationUrlPrev: pokemonGroupData.previous
        };

    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {array} pokemonDataArr 
 * @returns {void}
 */
function createAllPokemon(pokemonDataArr) {
    for (let i = 0; i < pokemonDataArr.length; i++) {
        createPokemon(pokemonDataArr[i], i);
    }
}

/**
 * @param {object} pokemon 
 * @param {number} index 
 * @returns {void}
 */
function createPokemon(pokemon, index) {
    // Pull id from url string
    const idRegex = /\/(\d+)\/$/;
    const pokeId = pokemon.url.match(idRegex)[1];
    const pokeNum = pokeId.toString().padStart(3, "0");
    const pokeName = pokemon.name;

    const card = createPokemonCard(pokeId, index, pokeNum, pokeName);
    main.append(card);
    card.addEventListener("click", () => handlePokemonCardClick(pokemon.url));
}

/**
 * @param {string} id 
 * @param {number} index 
 * @param {string} pokeNum 
 * @param {string} name 
 * @returns {HTMLElement}
 */
function createPokemonCard(id, index, pokeNum, name) {
    const card = document.createElement("button");
    card.classList.add("main-card-btn-container");
    const cardHTML =
        `
        <article class="main-card">
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="Pokemon character" width="96" height="96" loading="${index > 11 ? 'lazy' : 'eager'}" decoding="async">
            </figure>
            <section class="main-card-content">
                <p class="main-card-content-num">#${pokeNum}</p>
                <h2 class="main-card-content-name">${name}</h2>
            </section>
        </article>
        `;
    card.insertAdjacentHTML("afterbegin", cardHTML);

    return card;
}

export {
    getPokemonData,
    createAllPokemon
};