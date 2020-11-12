"use strict";

const pokemonAPI = (() => {
    const main = document.querySelector(".main");
    const loading = document.querySelector(".loading");

    function createPokemon(pokemon, pokeId) {
        const pokeNum = pokeId.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        // const pokeType = pokemon.types[0].type.name;
        // const pokeColor = colors[pokeType];
        // card.style.backgroundColor = pokeColor;
        const card = document.createElement("article");
        card.classList.add("main-card", `${pokeName}`);
        const cardHTML = 
            `
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png" alt="Pokemon character" width="600" height="600" loading="${pokeId > 12 ? 'lazy' : 'eager'}">
            </figure>
            <section class="main-card-content">
                <h3 class="main-card-content-num">#${pokeNum}</h3>
                <p class="main-card-content-name">${pokeName}</p>
            </section>
            `;

        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
        card.addEventListener("click", () => selectedPokemon(pokemon.url));
    }

    async function getPokemon() {
        loading.style.display = "flex";

        // let promisesArr = [];

        const pokemonGroupResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const pokemonGroupData = await pokemonGroupResponse.json();
        const pokemonDataArr = pokemonGroupData.results;
        
        for (let i = 0; i < pokemonDataArr.length; i++) {
            createPokemon(pokemonDataArr[i], i + 1);
        }
        // // Start at i = 1 for passing id to fetchPokemon func
        // for (let i = 1; i <= 150; i++) {
        //     promisesArr.push(fetchPokemon(i));
        // }

        // const pokemonData = await Promise.all(promisesArr);

        // for (let i = 0; i < pokemonData.length; i++) {
        //     createPokemon(pokemonData[i]);
        // }

        loading.style.display = "";
    }

    // async function fetchPokemon(id) {
    //     try {
    //         const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //         const res = await fetch(url, { mode: "cors" });
    //         const data = await res.json();

    //         return data;
            
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    function selectedPokemon(data) {
        sessionStorage.setItem("selectedPokemon", JSON.stringify(data));
        // Send user to separate page for selected character
        location = "poke-card.html";
    }

    getPokemon().catch(err => console.error(err));
})();

const searchFilter = (() => {
    const form = document.forms.search;
    const searchInput = form.elements.input;
    
    function getMatches() {
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