"use strict";

const pokemonAPI = (() => {
    const main = document.querySelector(".main");
    const url = `https://pokeapi.co/api/v2/pokemon/56`;

    function createPokemon(pokemon) {
        console.log(pokemon);
        const pokeImg = pokemon.sprites.front_shiny;
        const pokeNum = pokemon.id.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const pokeType = pokemon.types[0].type.name;
        const card = document.createElement("article");
        card.classList.add("main-card");
        const cardHTML = 
            `
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="${pokeImg}"></img>
            </figure>
            <section class="main-card-content">
                <h3 class="main-card-content-num">#${pokeNum}</h3>
                <p class="main-card-content-name">${pokeName}</p>
                <p class="main-card-content-type">${pokeType}</p>
            </section>
            `;
        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
    }

    async function fetchPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url, { mode: "cors" });
    }

    fetch(url, { mode: "cors" })
        .then(res => res.json())
        .then(data => createPokemon(data))
        .catch(err => console.error(err));

})();