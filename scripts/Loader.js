const loaderModule = (() => {
    // DOM elem ref
    const loader = document.querySelector(".loading");

    function showLoader() {
        if (loader.attributeStyleMap) {
            // Use CSS Houdini Typed OM
            loader.attributeStyleMap.set("display", "flex");
        } else {
            // Use old 'style' property
            loader.style.display = "flex";
        }
    }

    function hideLoader() {
        if (loader.attributeStyleMap) {
            loader.attributeStyleMap.clear();
        } else {
            loader.style.display = "";
        }
    }

    return {
        showLoader,
        hideLoader
    };
})();

export { loaderModule };