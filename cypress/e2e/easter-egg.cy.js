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
});
