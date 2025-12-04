describe("Search box functionality", () => {
    const searchInput = "input.home-form-search";
    const pokemonPopup = "#pokemon-popup";
    const error = ".home-error";

    beforeEach(() => {
        cy.intercept(
            "GET",
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50",
        ).as("getPokemonCharactersData");

        cy.visit("/");

        cy.wait("@getPokemonCharactersData");
    });

    it("should successfully search a pokemon character and render the popup with the character's data", () => {
        const pokemonCharacterName = "mew";

        cy.intercept(
            "GET",
            `https://pokeapi.co/api/v2/pokemon/${pokemonCharacterName}`,
        ).as("getCharacterData");

        cy.get(searchInput).type(`${pokemonCharacterName}{enter}`);

        cy.wait("@getCharacterData");

        cy.get(pokemonPopup).should("be.visible");

        cy.get("h2").should("contain.text", pokemonCharacterName);

        cy.get(error).should("not.have.class", "home-error--show");
    });

    it("search box should handle case-insensitive queries", () => {
        const pokemonCharacterName = "mEw";
        const loweredPokemonCharacterName = pokemonCharacterName.toLowerCase();

        cy.intercept(
            "GET",
            `https://pokeapi.co/api/v2/pokemon/${loweredPokemonCharacterName}`,
        ).as("getCharacterData");

        cy.get(searchInput).type(`${pokemonCharacterName}{enter}`);

        cy.wait("@getCharacterData");

        cy.get(pokemonPopup).should("be.visible");

        cy.get("#popup-content").should("not.be.empty");
    });
});
