describe("Loader functionality", () => {
    it("should show loader animation during page load, then hide loader after", () => {
        // add a 500ms delay to response to guarantee the loader shows first
        cy.intercept(
            "GET",
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50",
            (req) => {
                req.on("response", (res) => {
                    res.setDelay(500);
                });
            },
        ).as("getPokemonCharactersDataWithDelay");

        cy.visit("/");

        cy.get(".loading").should("have.class", "loader--show");

        cy.wait("@getPokemonCharactersDataWithDelay");

        cy.get(".loading").should("not.have.class", "loader--show");

        cy.get("main").should("not.be.empty").and("be.visible");
    });
});
