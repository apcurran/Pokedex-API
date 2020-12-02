function removeChildrenElems(parentElem) {
    while (parentElem.firstChild) {
        parentElem.removeChild(parentElem.firstChild);
    }
}

export { removeChildrenElems };