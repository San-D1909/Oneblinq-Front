describe("Auth Tests", () => {
  it("Tests if login and logout works", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("t@t");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("t");
    cy.get(".my-2").click();
    cy.visit("/");
    cy.get("#accountdropdown").click();
    cy.get('[href="/logout"]').click();
  });
});
