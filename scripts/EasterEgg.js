let pressed = [];
const secretCode = "ArrowUpArrowDownArrowLeftArrowLeftArrowRight";

function checkCode(event) {
    // Ignore searchbar keypresses
    if (event.target.matches(".home-form-search")) return;

    pressed.push(event.key);
    pressed.splice(0, pressed.length - secretCode.length);

    const word = pressed.join("");

    if (word.includes(secretCode)) addPokeGif();
}

function addPokeGif() {
    // Check if gif already exists in the DOM first.
    if (document.querySelector(".easter-egg-gif")) return;

    const pokeGifHTML = `
        <iframe class="easter-egg-gif" src="https://giphy.com/embed/vsyKKf1t22nmw" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    `;

    document.body.insertAdjacentHTML("afterbegin", pokeGifHTML);
}

document.addEventListener("keydown", checkCode);