import { handlePokemonCardClick } from "./PokemonPopup.js";

const form = document.querySelector(".home-form");
const searchInput = form.querySelector(".home-form-search");

// /**
//  * @param {HTMLElement} card 
//  * @returns {void}
//  */
// function showCard(card) {
//     card.classList.remove("card--hide");
// }

// /**
//  * @param {HTMLElement} card 
//  * @returns {void}
//  */
// function hideCard(card) {
//     card.classList.add("card--hide");
// }

// /**
//  * @returns {void}
//  */
// function getMatches() {
//     const pokeCards = document.querySelectorAll(".main-card-btn-container");
//     const searchTermLower = searchInput.value.toLowerCase();

//     for (const card of pokeCards) {
//         const title = card.querySelector(".main-card-content-name").textContent;

//         if (title.includes(searchTermLower)) {
//             showCard(card);
//         } else {
//             hideCard(card);
//         }
//     }
// }

// /**
//  * @returns {void}
//  */
// function hideAllCards() {
//     const pokeCards = document.querySelectorAll(".main-card-btn-container");

//     for (let card of pokeCards) {
//         hideCard(card);
//     }
// }

// /**
//  * @returns {void}
//  */
// function showAllCards() {
//     const pokeCards = document.querySelectorAll(".main-card-btn-container");

//     for (let card of pokeCards) {
//         showCard(card);
//     }
// }

async function getSinglePokemonSearch() {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.value}`;
        handlePokemonCardClick(apiUrl);
        
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    getSinglePokemonSearch();
});
