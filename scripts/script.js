"use strict";

const pokemonAPI = (() => {
    const main = document.querySelector(".main");
    const loading = document.querySelector(".loading");
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
    };

    function createPokemon(pokemon) {
        const pokeNum = pokemon.id.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const pokeType = pokemon.types[0].type.name;
        const pokeColor = colors[pokeType];
        const card = document.createElement("article");
        card.classList.add("main-card", `${pokeName}`);
        card.style.backgroundColor = pokeColor;
        const cardHTML = 
            `
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="Pokemon character"></img>
            </figure>
            <section class="main-card-content">
                <h3 class="main-card-content-num">#${pokeNum}</h3>
                <p class="main-card-content-name">${pokeName}</p>
                <p class="main-card-content-type">Type: ${pokeType}</p>
            </section>
            `;
        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
        card.addEventListener("click", () => selectedPokemon(pokemon));
    }

    async function getPokemon() {
        loading.style.display = "flex";

        let promisesArr = [];

        for (let i = 1; i <= 150; i++) {
            promisesArr.push(await fetchPokemon(i));
        }

        Promise.all(promisesArr);

        loading.style.display = "";
    }

    async function fetchPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url, { mode: "cors" });
        const data = await res.json();
        createPokemon(data);
    }

    function selectedPokemon(data) {
        sessionStorage.setItem("selectedPokemon", JSON.stringify(data));
        // Send user to separate page for selected character
        location = "poke-card.html";
    }

    getPokemon().catch(err => console.error(err));
})();

const searchFilter = (() => {
    if (document.body.id !== "home") return;

    const form = document.forms.search;
    const searchInput = form.elements.input;

    function getMatches(event) {
        const searchTerm = searchInput.value.toLowerCase();
        const pokeCards = document.querySelectorAll(".main-card");

        for (const card of pokeCards) {
            const title = card.querySelector(".main-card-content-name").textContent;
            const regex = new RegExp(`^${searchTerm}`, "gi"); // Match the title beginning with searchTerm

            if (title.match(regex)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        }

    }

    searchInput.addEventListener("keyup", getMatches);
    form.addEventListener("submit", event => event.preventDefault()); // Prevent page refresh
})();