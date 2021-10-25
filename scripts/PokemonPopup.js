import { Loader } from "./Loader.js";

const PokemonPopup = (() => {
    // DOM elem ref
    const main = document.querySelector(".main");

    async function handlePokemonCardClick(pokemonUrl) {
        try {
            Loader.showLoader();

            const data = await getPokemonCharacterData(pokemonUrl);
            createPokeCardPopup(data);

            Loader.hideLoader();

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
                    <button class="popup__close-btn" type="button" aria-label="Close">
                        <svg class="popup__close-btn__x" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <section class="poke-main-section-data">
                        <h1 class="poke-main-section-data-title">${pokeCardData.name}</h1>
                        <img class="poke-main-section-data-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokeCardData.id}.png" alt="${pokeCardData.name} Pokemon">
                        <p class="poke-main-section-data-body cap-first">Type: ${pokeType}</p>
                        <p class="poke-main-section-data-body">Weight: ${convertedWeight} lbs</p>
                        <p class="poke-main-section-data-body">Height: ${convertedHeight} ft</p>
                        <div class="poke-main-section-data-abilities">
                            <p class="poke-main-section-data-abilities-title cap-first">Ability: ${pokeCardData.abilities[0].ability.name}</p>
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

export { PokemonPopup };