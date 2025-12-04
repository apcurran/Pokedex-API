describe("Pagination functionality", () => {
    const nextButton = "#pagination-controls__btn--next";
    const previousButton = "#pagination-controls__btn--prev";
    const cards = ".main-card-btn-container";
    const cardHideClass = "btn--hide";
    const POKEMON_COUNT = 50;

    beforeEach(() => {
        cy.intercept(
            "GET",
            `**/api/v2/pokemon?offset=0&limit=${POKEMON_COUNT}`,
        ).as("initialLoad");
        cy.visit("/");
        cy.wait("@initialLoad");
    });

    it("should navigate to the next page and show both previous and next pagination buttons", () => {
        cy.intercept(
            "GET",
            `**/api/v2/pokemon?offset=50&limit=${POKEMON_COUNT}`,
        ).as("nextPageLoad");

        // previous button is hidden on first page
        cy.get(previousButton).should("have.class", cardHideClass);

        cy.get(nextButton).click();

        cy.wait("@nextPageLoad");

        // check for updated cards on second page
        cy.get(cards).should("have.length", POKEMON_COUNT);

        cy.get(cards)
            .first()
            .should("not.contain", /bulbasaur/);

        cy.get(nextButton).should("not.have.class", cardHideClass);
        cy.get(previousButton).should("not.have.class", cardHideClass);
    });
});
