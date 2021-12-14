describe("User dashboard tests", () => {
  it("Login to see user dashboard test", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("t@t");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("t");
    cy.get(".my-2").click();
  });

  it("Redirection to user dashboard test", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("t@t");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("t");
    cy.get(".my-2").click();
    cy.visit("/");
    cy.get("#accountdropdown").click();
    cy.get('[href="/user/dashboard/"]').click();
  });

  it("Show info button test on Licenses on the userdashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("t@t");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("t");
    cy.get(".my-2").click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Show info button test on Plugins on the userdashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("t@t");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("t");
    cy.get(".my-2").click();
    cy.get('[href="http://localhost:3000/user/dashboard/#/plugin"]').click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });
});
