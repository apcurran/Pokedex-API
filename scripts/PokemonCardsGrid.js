import { PokemonPopup } from "./PokemonPopup.js";

const PokemonCardsGrid = (() => {
    // DOM elem ref
    const main = document.querySelector(".main");
    
    async function getPokemonData(apiUrl) {
        try {
            const pokemonGroupResponse = await fetch(apiUrl, { cache: "force-cache" });
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
        const idRegex = /\/(\d+)\/$/;
        const pokeId = pokemon.url.match(idRegex)[1];
    
        const pokeNum = pokeId.toString().padStart(3, "0");
        const pokeName = pokemon.name;
        const card = document.createElement("button");
        card.classList.add("main-card-btn-container");
        const cardHTML = 
        `
        <article class="main-card">
            <figure class="main-card-fig">
                <img class="main-card-fig-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png" alt="Pokemon character" width="600" height="600" loading="${index > 11 ? 'lazy' : 'eager'}" decoding="async">
            </figure>
            <section class="main-card-content">
                <p class="main-card-content-num">#${pokeNum}</p>
                <h3 class="main-card-content-name">${pokeName}</h3>
            </section>
        </article>
        `;
        
        card.insertAdjacentHTML("afterbegin", cardHTML);
        main.append(card);
        card.addEventListener("click", () => PokemonPopup.handlePokemonCardClick(pokemon.url));
    }

    return {
        getPokemonData,
        createAllPokemon
    };
})();

export { PokemonCardsGrid };