const form = document.forms.search;
const searchInput = form.elements.input;

// Helper functions
function showCard(card) {
    if (card.attributeStyleMap) {
        // Use CSS Houdini Typed OM
        card.attributeStyleMap.clear();
    } else {
        // Keep original "display: flex" value
        card.style.display = "";
    }
}

function hideCard(card) {
    if (card.attributeStyleMap) {
        // Use CSS Houdini Typed OM
        card.attributeStyleMap.set("display", "none");
    } else {
        // Fallback to old "style" property
        card.style.display = "none";
    }
}

function getMatches() {
    const pokeCards = document.querySelectorAll(".main-card");
    const searchTerm = searchInput.value;
    const regex = new RegExp(`^${searchTerm}`, "gi"); // Match the title beginning with searchTerm

    for (const card of pokeCards) {
        const title = card.querySelector(".main-card-content-name").textContent;
        
        if (title.match(regex)) {
            showCard(card);
        } else {
            hideCard(card);
        }
    }
}

form.addEventListener("submit", event => event.preventDefault()); // Prevent page refresh
searchInput.addEventListener("keyup", getMatches);