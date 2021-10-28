const Loader = (() => {
    /** @type {HTMLDivElement} */
    const loader = document.querySelector(".loading");

    function showLoader() {
        loader.classList.add("loader--show");
    }

    function hideLoader() {
        loader.classList.remove("loader--show");
    }

    return {
        showLoader,
        hideLoader
    };
})();

export { Loader };