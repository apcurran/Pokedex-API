function removeChildElems(parentElem) {
    while (parentElem.firstChild) {
        parentElem.removeChild(parentElem.firstChild);
    }
}

export { removeChildElems };