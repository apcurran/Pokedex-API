"use strict";

{
    // Pokemon Cards Grid
    const main = document.querySelector(".main");
    const loading = document.querySelector(".loading");

    function createPokemon(pokemon, pokeId) {
        const pokeNum = pokeId.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const card = document.createElement("article");
        card.classList.add("main-card");
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

        const pokemonGroupResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const pokemonGroupData = await pokemonGroupResponse.json();
        const pokemonDataArr = pokemonGroupData.results;
        
        for (let i = 0; i < pokemonDataArr.length; i++) {
            createPokemon(pokemonDataArr[i], i + 1);
        }

        loading.style.display = "";
    }

    async function selectedPokemon(pokemonUrl) {
        try {
            const response = await fetch(pokemonUrl);
            const data = await response.json();
            
            createPokeCardPopup(data);

        } catch (err) {
            console.error(err);
        }

    }

    // Create Pokemon cards on page load
    getPokemon().catch(err => console.error(err));

    // Pokemon Pop-Up
    function createPokeCardPopup(pokeCardData) {
        const pokeType = pokeCardData.types[0].type.name;
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
        const pokeColor = colors[pokeType];
        
        const convertedWeight = (pokeCardData.weight / 4.536).toFixed(2); // Convert hectograms to pounds
        const convertedHeight = (pokeCardData.height / 3.048).toFixed(2); // Convert decimeters to feet
        const stat1Val = pokeCardData.stats[0].base_stat;
        const stat2Val = pokeCardData.stats[1].base_stat;
        const stat3Val = pokeCardData.stats[2].base_stat;
        const stat4Val = pokeCardData.stats[3].base_stat;
        const stat5Val = pokeCardData.stats[4].base_stat;
        const stat6Val = pokeCardData.stats[5].base_stat;
        
        function capInitialLetter(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
        
        const pokeCardHTML = `
            <div class="popup-container">
                <section class="poke-main-section popup" style="background-color: ${pokeColor};">
                    <button class="popup__close-btn">
                        <svg class="popup__close-btn__x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <section class="poke-main-section-data">
                        <h1 class="poke-main-section-data-title">${pokeCardData.name}</h1>
                        <img class="poke-main-section-data-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokeCardData.id}.png" alt="${pokeCardData.name} Pokemon">
                        <p class="poke-main-section-data-body">Type: ${capInitialLetter(pokeType)}</p>
                        <p class="poke-main-section-data-body">Weight: ${convertedWeight} lbs</p>
                        <p class="poke-main-section-data-body">Height: ${convertedHeight} ft</p>
                        <div class="poke-main-section-data-abilities">
                            <p class="poke-main-section-data-abilities-title">Ability: <span>${capInitialLetter(pokeCardData.abilities[0].ability.name)}</span></p>
                        </div>
                    </section>
                    <section class="poke-main-section-stats">
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[0].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat1Val}%"><small>${stat1Val}%</small></div>
                        </div>
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[1].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat2Val}%"><small>${stat2Val}%</small></div>
                        </div>
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[2].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat3Val}%"><small>${stat3Val}%</small></div>
                        </div>
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[3].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat4Val}%"><small>${stat4Val}%</small></div>
                        </div>
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[4].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat5Val}%"><small>${stat5Val}%</small></div>
                        </div>
                        <h3 class="poke-main-section-stats-title">${pokeCardData.stats[5].stat.name}</h3>
                        <div class="poke-main-section-stats-prog">
                            <div class="poke-main-section-stats-prog-bar" style="width: ${stat6Val}%"><small>${stat6Val}%</small></div>
                        </div>
                    </section>
                </section>
            </div>
        `;

        main.insertAdjacentHTML("afterbegin", pokeCardHTML);

        // Close Popup event listeners
        document.addEventListener("click", handleClosePopopClick);
        document.addEventListener("keydown", handleClosePopupEsc);
    }
    
    function handleClosePopopClick(event) {
        const isOutside = !event.target.closest(".popup");
        const isPopupCloseBtn = event.target.closest(".popup__close-btn");
        const popupContainer = main.querySelector(".popup-container");
        
        if (popupContainer && isOutside || popupContainer && isPopupCloseBtn) {
            popupContainer.remove();
        }
    }
    
    function handleClosePopupEsc(event) {
        if (event.key !== "Escape") return;

        const popupContainer = main.querySelector(".popup-container");

        popupContainer.remove();
    }
}

{
    // Search Filter
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

}