describe("Home page initial load with essential parts rendering correctly", () => {
    beforeEach(() => {
        cy.intercept(
            "GET",
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50",
        ).as("getPokemonCharactersData");

        cy.visit("/");

        cy.wait("@getPokemonCharactersData");
    });

    it("should render search box", () => {
        cy.get("input.home-form-search")
            .should("be.visible")
            .and("have.attr", "placeholder", "Search for a Pokémon");
    });

    it("should show 50 pokemon character cards", () => {
        cy.get(".main").should("be.visible");

        cy.get(".main-card-btn-container")
            .should("have.length.greaterThan", 1)
            .first()
            .should("be.visible");
    });

    it("should render next button and hide previous button on first page", () => {
        cy.get("#pagination-controls__btn--next").should("be.visible");

        cy.get("#pagination-controls__btn--prev").should("not.be.visible");
    });
});
