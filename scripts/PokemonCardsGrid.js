import { handlePokemonCardClick, createPokeCardPopup } from "./PokemonPopup.js";

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

// search for character on submit
async function getSinglePokemonData(queryName) {
    try {
        const API_URL = `https://pokeapi.co/api/v2/pokemon/${queryName}`;
        const characterDataResponse = await fetch(API_URL);
        const characterData = await characterDataResponse.json();

        return characterData;

    } catch (err) {
        console.error(err);
    }
}

function createAllPokemon(pokemonDataArr) {
    for (let i = 0; i < pokemonDataArr.length; i++) {
        createPokemon(pokemonDataArr[i], i);
    }
}

function createPokemon(pokemon, index) {
    // Pull id from url string
    const idRegex = /\/(\d+)\/$/;
    const pokeId = pokemon.url.match(idRegex)[1];
    const pokeNum = pokeId.toString().padStart(3, "0");
    const pokeName = pokemon.name;

    const card = createPokemonHTML(pokeId, index, pokeNum, pokeName);
    main.append(card);
    card.addEventListener("click", () => handlePokemonCardClick(pokemon.url));
}

function createSinglePokemon(pokemonData) {
    const pokeId = pokemonData.id;
    const pokeNum = pokeId.toString().padStart(3, "0");
    const pokeName = pokemonData.name;
    
    const card = createPokemonHTML(pokeId, 1, pokeNum, pokeName);
    main.append(card);
    // BUG -- clicking the card causes a flash of popup and then a deletion from DOM
    card.addEventListener("click", () => createPokeCardPopup(pokemonData));
}

function createPokemonHTML(id, index, num, name) {
    const card = document.createElement("button");
    card.classList.add("main-card-btn-container");
    const cardHTML =
        `
        <article class="main-card">
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="Pokemon character" width="96" height="96" loading="${index > 11 ? 'lazy' : 'eager'}" decoding="async">
            </figure>
            <section class="main-card-content">
                <p class="main-card-content-num">#${num}</p>
                <h2 class="main-card-content-name">${name}</h2>
            </section>
        </article>
        `;
    card.insertAdjacentHTML("afterbegin", cardHTML);

    return card;
}

export {
    getPokemonData,
    getSinglePokemonData,
    createAllPokemon,
    createSinglePokemon
};