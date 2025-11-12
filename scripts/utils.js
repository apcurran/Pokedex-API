/**
 * @param {HTMLElement} parent
 * @returns {void}
 */
function removeChildElems(parent) {
    parent.replaceChildren();
}

export { removeChildElems };
