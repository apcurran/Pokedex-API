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

    it("no easter egg shown when incorrect sequence entered", () => {
        const incorrectSecretCode =
            "{uparrow}{uparrow}{leftarrow}{leftarrow}{leftarrow}";

        cy.get("body").type(incorrectSecretCode);

        cy.get(gif).should("not.exist");
    });
});
