import { getSinglePokemonData, createSinglePokemon } from "./PokemonCardsGrid.js";

const form = document.forms.search;
const searchInput = form.elements.input;

// Helper functions
function showCard(card) {
    card.classList.remove("card--hide");
}

function hideCard(card) {
    card.classList.add("card--hide");
}

function getMatches() {
    const pokeCards = document.querySelectorAll(".main-card-btn-container");
    const searchTermLower = searchInput.value.toLowerCase();

    for (const card of pokeCards) {
        const title = card.querySelector(".main-card-content-name").textContent;
        
        if (title.includes(searchTermLower)) {
            showCard(card);
        } else {
            hideCard(card);
        }
    }
}

async function getCharacter(event) {
    event.preventDefault();
    
    const pokemonCharacterData = await getSinglePokemonData(searchInput.value);
    createSinglePokemon(pokemonCharacterData);
}

form.addEventListener("submit", getCharacter); // Prevent page refresh
searchInput.addEventListener("keyup", getMatches);