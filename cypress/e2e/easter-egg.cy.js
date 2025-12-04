describe("Easter egg functionality", () => {
    const secretCode = "{uparrow}{downarrow}{leftarrow}{leftarrow}{rightarrow}";
    const gif = ".easter-egg-gif";

    beforeEach(() => {
        cy.clock();
        cy.visit("/");
    });

    it("should display the easter egg gif when the correct code is inputted", () => {
        cy.get("body").type(secretCode);

        cy.get(gif).should("be.visible");
    });

    it("should remove gif after 7-second delay", () => {
        cy.get("body").type(secretCode);
        cy.get(gif).should("exist");

        cy.tick(7000);
        cy.get(gif).should("not.exist");
    });

    it("no easter egg shown when incorrect sequence entered", () => {
        const incorrectSecretCode =
            "{uparrow}{uparrow}{leftarrow}{leftarrow}{leftarrow}";

        cy.get("body").type(incorrectSecretCode);

        cy.get(gif).should("not.exist");
    });

    // it("no easter egg shown when sequence is entered in search input", () => {
    //     const searchInput = ".home-form-search";

    //     cy.get(searchInput).focus();

    //     cy.get(searchInput).type(secretCode);

    //     cy.get(gif).should("not.exist");

    //     cy.get(searchInput).should(
    //         "have.value",
    //         /"ArrowUpArrowDownArrowLeftArrowLeftArrowRight"/i,
    //     );
    // });
});
