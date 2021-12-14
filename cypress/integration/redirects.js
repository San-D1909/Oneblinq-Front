describe("Redirect tests", () => {
  it("Test home to plugin page", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".btn-oneblinq-roze").click();
    /* ==== End Cypress Studio ==== */
  });

  it("Test home to plugin bundle information page", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".btn-oneblinq-roze").click();
    cy.get(":nth-child(4) > .row > .col-12 > .card > .card-body > img").click();
    /* ==== End Cypress Studio ==== */
  });

  it("Test home to plugin information page", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".btn-oneblinq-roze").click();
    cy.get(
      ":nth-child(7) > :nth-child(1) > :nth-child(1) > .card > .card-body > img"
    ).click();
    /* ==== End Cypress Studio ==== */
  });
});
