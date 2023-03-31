const secretCode = "ArrowUpArrowDownArrowLeftArrowLeftArrowRight";
// Data
let pressed = [];

function checkForCodeSequence(event) {
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

    const gifIframe = document.createElement("iframe");
    gifIframe.classList.add("easter-egg-gif", "giphy-embed");
    gifIframe.src = "https://giphy.com/embed/vsyKKf1t22nmw";
    gifIframe.width = 480;
    gifIframe.height = 480;

    document.body.append(gifIframe);
    setTimeout(() => gifIframe.remove(), 7000);
}

document.addEventListener("keydown", checkForCodeSequence);
