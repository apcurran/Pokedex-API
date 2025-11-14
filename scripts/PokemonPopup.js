import { showLoader, hideLoader } from "./Loader.js";

// const main = document.querySelector(".main"); // removed with popover API refactor
/** @type {HTMLElement} */
const pokemonPopup = document.getElementById("pokemon-popup");
/** @type {HTMLElement} */
const popupContent = document.getElementById("popup-content");

/**
 * @param {string} pokemonUrl
 * @returns {void}
 */
async function handlePokemonCardClick(pokemonUrl) {
    try {
        pokemonPopup.hidePopover();
        // remove old pokemon character info
        popupContent.replaceChildren();

        showLoader();
        const data = await getPokemonCharacterData(pokemonUrl);

        if (data instanceof Error) {
            const errorElem = document.querySelector(".home-error");
            errorElem.textContent = data.message;
            errorElem.classList.add("home-error--show");

            setTimeout(() => {
                // fade out elem
                errorElem.classList.remove("home-error--show");

                errorElem.addEventListener(
                    "animationend",
                    () => {
                        // remove text after elem faded out
                        errorElem.textContent = "";
                    },
                    { once: true },
                );
            }, 7000);

            return;
        }

        // update card HTML data, then show popover
        createPokemonCardPopup(data);
        pokemonPopup.showPopover();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

/**
 * @param {string} pokemonUrl
 * @returns {Promise|null}
 */
async function getPokemonCharacterData(pokemonUrl) {
    try {
        const response = await fetch(pokemonUrl, { cache: "force-cache" });

        if (response.status === 404) {
            throw Error(
                "It looks like that Pokemon does not exist. Please check your spelling and try again.",
            );
        }

        const data = await response.json();

        return data;
    } catch (err) {
        return err;
    }
}

function createPokemonCardPopup(pokeCardData) {
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
        water: "#90cdf4",
    };
    const pokeColor = colors[pokeType];
    // Set popup bg color to CSS var
    document.documentElement.style.setProperty("--popup-card-bg", pokeColor);

    const convertedWeightFromHectogramsToPounds = (
        pokeCardData.weight / 4.536
    ).toFixed(2);
    const convertedHeightFromDecimetersToFeet = (
        pokeCardData.height / 3.048
    ).toFixed(2);
    const stat1Val = pokeCardData.stats[0].base_stat;
    const stat2Val = pokeCardData.stats[1].base_stat;
    const stat3Val = pokeCardData.stats[2].base_stat;
    const stat4Val = pokeCardData.stats[3].base_stat;
    const stat5Val = pokeCardData.stats[4].base_stat;
    const stat6Val = pokeCardData.stats[5].base_stat;
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeCardData.id}.png`;

    const pokeCardHTML = `
            <article class="poke-main-section popup">
                <button class="popup__close-btn" type="button" aria-label="Close" popovertarget="pokemon-popup" popovertargetaction="hide">
                    <svg class="popup__close-btn__x" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <section class="poke-main-section-data">
                    <h2 class="poke-main-section-data-title">${pokeCardData.name}</h2>
                    <img class="poke-main-section-data-img" src="${imgSrc}" alt="${pokeCardData.name} Pokemon" width="475" height="475">
                    <p class="poke-main-section-data-body cap-first"><span>Type:</span> ${pokeType}</p>
                    <p class="poke-main-section-data-body"><span>Weight:</span> ${convertedWeightFromHectogramsToPounds} lbs</p>
                    <p class="poke-main-section-data-body"><span>Height:</span> ${convertedHeightFromDecimetersToFeet} ft</p>
                    <p class="poke-main-section-data-body cap-first"><span>Ability:</span> ${pokeCardData.abilities[0].ability.name}</p>
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
            </article>
        `;

    popupContent.innerHTML = pokeCardHTML;
}

export { handlePokemonCardClick, getPokemonCharacterData };
