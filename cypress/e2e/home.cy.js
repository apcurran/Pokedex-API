describe("Home page initial load with basic data", () => {
    beforeEach(() => {
        cy.intercept(
            "GET",
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50",
        ).as("getPokemonCharactersData");

        cy.visit("/");

        cy.wait("@getPokemonCharactersData");
    });

    it("should visit the home page and show 50 character cards", () => {
        cy.get(".main").should("be.visible");

        cy.get(".main-card-btn-container")
            .should("have.length.greaterThan", 1)
            .first()
            .should("be.visible");
    });
});
