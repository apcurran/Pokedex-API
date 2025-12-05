const GIF_DURATION_MS = 7_000;
const secretCode = "ArrowUpArrowDownArrowLeftArrowLeftArrowRight";
// Data
let pressed = [];

/**
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function checkForCodeSequence(event) {
    // Ignore searchbar keypresses
    if (event.target.matches(".home-form-search")) return;

    pressed.push(event.key);
    pressed.splice(0, pressed.length - secretCode.length);

    const pressedCode = pressed.join("");

    if (pressedCode === secretCode) {
        addPokeGif();
        // reset the state after correct code inputted
        pressed = [];
    }
}

function addPokeGif() {
    // Check if gif already exists in the DOM first.
    if (document.querySelector(".easter-egg-gif")) return;

    const gifIframe = document.createElement("iframe");
    gifIframe.classList.add("easter-egg-gif", "giphy-embed");
    gifIframe.src = "https://giphy.com/embed/vsyKKf1t22nmw";
    gifIframe.width = 480;
    gifIframe.height = 480;

    document.body.append(gifIframe);
    setTimeout(() => gifIframe.remove(), GIF_DURATION_MS);
}

document.addEventListener("keydown", checkForCodeSequence);
