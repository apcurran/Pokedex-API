"use strict";

const pokemonAPI = (() => {
    if (document.body.id !== "home") return;

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
                <img class="main-card-fig-img" src="${pokeImg}" alt="Pokemon character"></img>
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

    function selectedPokemon(data) {
        sessionStorage.setItem("selectedPokemon", JSON.stringify(data));
        // Send user to separate page for selected character
        location = "pokecard.html";
    }

    getPokemon().catch(err => console.error(err));

})();

const pokeCard = (() => {
    if (document.body.id !== "poke-card-data") return;

    (function createPokeCardData() {
        const pokeCardData = JSON.parse(sessionStorage.getItem("selectedPokemon"));
        console.log(pokeCardData);
        const pokeMain = document.querySelector(".poke-main");
        const convertedWeight = (pokeCardData.weight / 4.536).toFixed(2); // Convert hectograms to pounds
        const convertedHeight = (pokeCardData.height / 3.048).toFixed(2); // Convert decimeters to feet
        const stat1Val = pokeCardData.stats[0].stat.base_stat;
        const stat2Val = pokeCardData.stats[1].stat.base_stat;

        const pokeCardHTML = `
            <section class="poke-main-section">
                <h1 class="poke-main-section-title">${pokeCardData.name}</h1>
                <img class="poke-main-section-img" src="${pokeCardData.sprites.front_default}" alt="${pokeCardData.name} Pokemon">
                <p>Weight: ${convertedWeight} lbs, Height: ${convertedHeight} ft</p>
                <p class="poke-main-section-para">${pokeCardData.abilities[0].ability.name}</p>
                <p class="poke-main-section-para">${pokeCardData.abilities[1].ability.name}</p>
                <div class="poke-main-section-prog">
                    <div class="poke-main-section-prog-bar" style="width: ${stat1Val}%"><small>100%</small></div>
                </div>
                <div class="poke-main-section-prog">
                    <div class="poke-main-section-prog-bar" style="width: ${stat1Val}%"><small>100%</small></div>
                </div>
                <div class="poke-main-section-prog">
                    <div class="poke-main-section-prog-bar" style="width: ${stat1Val}%"><small>100%</small></div>
                </div>
                <div class="poke-main-section-prog">
                    <div class="poke-main-section-prog-bar" style="width: ${stat1Val}%"><small>100%</small></div>
                </div>
                <div class="poke-main-section-prog">
                    <div class="poke-main-section-prog-bar" style="width: ${stat1Val}%"><small>100%</small></div>
                </div>
            </section>
        `;

        pokeMain.insertAdjacentHTML("afterbegin", pokeCardHTML);

        
    })();

})();