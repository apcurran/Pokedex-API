import { loaderModule } from "./Loader.js";
import { removeChildrenElems } from "./utils.js";

const paginationModule = (() => {
    // Data
    let pagination = {
        nextUrl: "",
        prevUrl: ""
    };

    // DOM elem refs
    const paginationNextBtn = document.getElementById("pagination-controls__btn--next");
    const paginationPrevBtn = document.getElementById("pagination-controls__btn--prev");
    const main = document.querySelector(".main");

    function updatePaginationUrl(urlType, newUrl) {
        pagination[urlType] = newUrl;

        if (pagination.nextUrl == null) {
            showNextPaginationBtn(false);
        } else {
            showNextPaginationBtn(true);
        }

        if (pagination.prevUrl == null) {
            showPrevPaginationBtn(false);
        } else {
            showPrevPaginationBtn(true);
        }
    }

    function showPrevPaginationBtn(status) {
        if (status) {
            paginationPrevBtn.classList.remove("btn--hide");
        } else {
            paginationPrevBtn.classList.add("btn--hide");
        }
    }

    function showNextPaginationBtn(status) {
        if (status) {
            paginationNextBtn.classList.remove("btn--hide");
        } else {
            paginationNextBtn.classList.add("btn--hide");
        }
    }

    async function handlePaginationClick(type) {
        try {
            // Clear prev pokemon cards first
            removeChildrenElems(main);
    
            loaderModule.showLoader();
            
            // Get new Pokemon data
            const { pokemonData, paginationUrlNext, paginationUrlPrev } = await pokemonCardsGridModule.getPokemonData(pagination[type]);
            // Create Pokemon cards
            pokemonCardsGridModule.createAllPokemon(pokemonData);

            loaderModule.hideLoader();
    
            // Update to new pagination data
            updatePaginationUrl("nextUrl", paginationUrlNext);
            updatePaginationUrl("prevUrl", paginationUrlPrev);
            
        } catch (err) {
            console.error(err);
        }
    }

    // Event listeners
    paginationNextBtn.addEventListener("click", () => handlePaginationClick("nextUrl"));
    paginationPrevBtn.addEventListener("click", () => handlePaginationClick("prevUrl"));

    return {
        updatePaginationUrl
    };
})();

const pokemonCardsGridModule = (() => {
    // DOM elem ref
    const main = document.querySelector(".main");
    
    async function getPokemonData(apiUrl) {
        try {
            const pokemonGroupResponse = await fetch(apiUrl);
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

    function createAllPokemon(pokemonDataArr) {
        for (let i = 0; i < pokemonDataArr.length; i++) {
            createPokemon(pokemonDataArr[i], i);
        }
    }

    function createPokemon(pokemon, index) {
        // Pull id from url string
        const pokeUrl = pokemon.url;
        const idRegex = /\/(\d+)\/$/;
        const pokeId = pokeUrl.match(idRegex)[1];
    
        const pokeNum = pokeId.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const card = document.createElement("button");
        card.classList.add("main-card-btn-container");
        const cardHTML = 
        `
        <article class="main-card">
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png" alt="Pokemon character" width="600" height="600" loading="${index > 11 ? 'lazy' : 'eager'}">
            </figure>
            <section class="main-card-content">
                <p class="main-card-content-num">#${pokeNum}</p>
                <h3 class="main-card-content-name">${pokeName}</h3>
            </section>
        </article>
        `;
        
        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
        card.addEventListener("click", () => pokemonPopupModule.handlePokemonCardClick(pokeUrl));
    }

    return {
        getPokemonData,
        createAllPokemon
    };
})();

const pokemonPopupModule = (() => {
    // DOM elem ref
    const main = document.querySelector(".main");

    async function handlePokemonCardClick(pokemonUrl) {
        try {
            loaderModule.showLoader();

            const data = await getPokemonCharacterData(pokemonUrl);
            createPokeCardPopup(data);

            loaderModule.hideLoader();

        } catch (err) {
            console.error(err);
        }
    }

    async function getPokemonCharacterData(pokemonUrl) {
        try {
            const response = await fetch(pokemonUrl);
            const data = await response.json();

            return data;
    
        } catch (err) {
            console.error(err);
        }
    }

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
    }

    // Helper func
    function capInitialLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    function handleClosePopopClick(event) {
        const popupContainer = main.querySelector(".popup-container");
    
        if (!popupContainer) return;
    
        const isOutside = !event.target.closest(".popup");
        const isPopupCloseBtn = event.target.closest(".popup__close-btn");
        
        if (isOutside || isPopupCloseBtn) {
            popupContainer.remove();
        }
    }
    
    function handleClosePopupEsc(event) {
        const popupContainer = main.querySelector(".popup-container");

        if (event.key !== "Escape" || !popupContainer) return;
    
        popupContainer.remove();
    }

    document.addEventListener("click", handleClosePopopClick);
    document.addEventListener("keydown", handleClosePopupEsc);

    return {
        handlePokemonCardClick
    };
})();

// On page load
async function init() {
    const POKEMON_PER_PAGE = 50;
    const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}`;
    
    loaderModule.showLoader();

    // Get Pokemon data
    const { pokemonData, paginationUrlNext, paginationUrlPrev } = await pokemonCardsGridModule.getPokemonData(apiEndpoint);
    // Create Pokemon cards
    pokemonCardsGridModule.createAllPokemon(pokemonData);

    loaderModule.hideLoader();

    // Update pagination data
    paginationModule.updatePaginationUrl("nextUrl", paginationUrlNext);
    paginationModule.updatePaginationUrl("prevUrl", paginationUrlPrev);
}

init();