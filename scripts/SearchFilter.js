const form = document.querySelector(".home-form");
const searchInput = form.querySelector(".home-form-search");

/**
 * @param {HTMLElement} card 
 * @returns {void}
 */
function showCard(card) {
    card.classList.remove("card--hide");
}

/**
 * @param {HTMLElement} card 
 * @returns {void}
 */
function hideCard(card) {
    card.classList.add("card--hide");
}

/**
 * @returns {void}
 */
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

form.addEventListener("submit", (event) => event.preventDefault()); // Prevent page refresh
searchInput.addEventListener("keyup", getMatches);