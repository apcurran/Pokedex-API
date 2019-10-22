"use strict";

const pokemonAPI = (() => {
    const main = document.querySelector(".main");
    const colors = {
        bug: "#68d391",
        dark: "ccc",
        dragon: "#81e6d9",
        electric: "#faf089",
        fairy: "#feb2b2",
        fighting: "#f6ad55",
        fire: "#fc8181",
        flying: "#e2e8f0",
        ghost: "#b794f4",
        grass: "#c6f6d5",
        ground: "#ecc94b",
        ice: "#bee3f8",
        normal: "#b2f5ea",
        poison: "#d6bcfa",
        psychic: "#fbb6ce",
        rock: "#fbd38d",
        steel: "#9ae6b4",
        water: "#90cdf4"
    }

    function createPokemon(pokemon) {
        console.log(pokemon);
        const pokeImg = pokemon.sprites.front_shiny;
        const pokeNum = pokemon.id.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const pokeType = pokemon.types[0].type.name;
        const pokeColor = colors[pokeType];
        const card = document.createElement("article");
        card.classList.add("main-card");
        card.style.backgroundColor = pokeColor;
        const cardHTML = 
            `
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="${pokeImg}"></img>
            </figure>
            <section class="main-card-content">
                <h3 class="main-card-content-num">#${pokeNum}</h3>
                <p class="main-card-content-name">${pokeName}</p>
                <p class="main-card-content-type">Type: ${pokeType}</p>
            </section>
            `;
        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
    }

    async function getPokemon() {
        for (let i = 1; i <= 150; i++) {
            await fetchPokemon(i);
        }
    }

    async function fetchPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url, { mode: "cors" });
        const data = await res.json();
        createPokemon(data);
    }

    getPokemon();

})();