describe("Popover functionality", () => {
    const cardSelector = ".main-card-btn-container";
    const popupSelector = "#pokemon-popup";
    const popupContentSelector = "#popup-content";
    const popupArticleSelector = ".poke-main-section";
    const characterName = "bulbasaur";
    const characterId = "001";

    beforeEach(() => {
        cy.intercept("GET", "**/api/v2/pokemon?offset=0&limit=50").as(
            "initialLoad",
        );
        cy.visit("/");
        cy.wait("@initialLoad");

        cy.intercept("GET", "**/api/v2/pokemon/1/").as("getCharacterDetails");
    });

    it("should open the popover when a card is clicked, complete with correct character details", () => {
        cy.get(cardSelector).first().click();

        cy.wait("@getCharacterDetails");

        cy.get(popupSelector)
            .should("be.visible")
            .and("have.attr", "popover", "auto");

        cy.get(popupContentSelector).should("not.be.empty");

        // name, type, and ability of character
        cy.get(popupArticleSelector).contains(/bulbasaur/i);
        cy.get(popupArticleSelector).contains(/grass/i);
        cy.get(popupArticleSelector).contains(/overgrow/i);

        // stats bars
        cy.get(popupContentSelector)
            .find(".poke-main-section-stats-prog-bar")
            .should("have.length", 6);
    });
});
