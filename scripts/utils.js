/**
 * @param {HTMLElement} parent 
 * @returns {void}
 */
function removeChildElems(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export { removeChildElems };
