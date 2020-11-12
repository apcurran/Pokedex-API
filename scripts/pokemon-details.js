"use strict";

const pokeCard = (() => {
    function capInitialLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    
    (async function createPokeCardData() {
        const pokeCardDataUrl = JSON.parse(sessionStorage.getItem("selectedPokemon"));
        let pokeCardData;

        try {
            const pokeCardResponse = await fetch(pokeCardDataUrl);
            pokeCardData = await pokeCardResponse.json();

        } catch (err) {
            console.error(err);
        }
        
        const pokeMain = document.querySelector(".poke-main");
        const convertedWeight = (pokeCardData.weight / 4.536).toFixed(2); // Convert hectograms to pounds
        const convertedHeight = (pokeCardData.height / 3.048).toFixed(2); // Convert decimeters to feet
        const stat1Val = pokeCardData.stats[0].base_stat;
        const stat2Val = pokeCardData.stats[1].base_stat;
        const stat3Val = pokeCardData.stats[2].base_stat;
        const stat4Val = pokeCardData.stats[3].base_stat;
        const stat5Val = pokeCardData.stats[4].base_stat;
        const stat6Val = pokeCardData.stats[5].base_stat;

        const pokeCardHTML = `
            <section class="poke-main-section">
                <section class="poke-main-section-data">
                    <h1 class="poke-main-section-data-title">${pokeCardData.name}</h1>
                    <img class="poke-main-section-data-img" src="https://pokeres.bastionbot.org/images/pokemon/${pokeCardData.id}.png" alt="${pokeCardData.name} Pokemon">
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
        `;

        pokeMain.insertAdjacentHTML("afterbegin", pokeCardHTML);
    })();

})();