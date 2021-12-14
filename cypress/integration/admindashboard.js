describe("Admin dashboard tests", () => {
  it("Login to see admin dashboard test", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
  });

  it("Redirection to admin dashboard test", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.visit("/");
    cy.get("#accountdropdown").click();
    cy.get('[href="/user/dashboard/"]').click();
  });

  it("Show info button test on Licenses on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Show info button test on Plugins on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get('[href="http://localhost:3000/admin/dashboard/#/plugin"]').click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Create form test on Plugins on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get('[href="http://localhost:3000/admin/dashboard/#/plugin"]').click();
    cy.get(
      ".MuiToolbar-root > a.MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Add plugin name filter test on Plugins on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get('[href="http://localhost:3000/admin/dashboard/#/plugin"]').click();
    cy.get(
      ".RaFilterButton-root-95 > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
    cy.get('[data-key="pluginName"] > :nth-child(1)').click();
  });

  it("Add plugin description filter test on Plugins on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get('[href="http://localhost:3000/admin/dashboard/#/plugin"]').click();
    cy.get(
      ".RaFilterButton-root-95 > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
    cy.get('[data-key="pluginDescription"] > :nth-child(1)').click();
  });

  it("Show info button test on Users on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      '[href="http://localhost:3000/admin/dashboard/#/user"] > .MuiListItemIcon-root'
    ).click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Create form test on Users on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      '[href="http://localhost:3000/admin/dashboard/#/user"] > .MuiListItemIcon-root'
    ).click();
    cy.get(
      ".MuiToolbar-root > a.MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Edit form test on Users on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
  });

  it("Show info button test on LicenseTypes on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      '[href="http://localhost:3000/admin/dashboard/#/licenseType"]'
    ).click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Create form test on LicenseTypes on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      '[href="http://localhost:3000/admin/dashboard/#/licenseType"]'
    ).click();
    cy.get(
      ".MuiToolbar-root > a.MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });

  it("Edit form test on LicenseTypes on the admindashboard", () => {
    cy.visit("/");
    cy.get("li.nav-item > .nav-link").click();
    cy.get(":nth-child(1) > .form-control").clear();
    cy.get(":nth-child(1) > .form-control").type("admin@admin");
    cy.get(":nth-child(2) > .form-control").clear();
    cy.get(":nth-child(2) > .form-control").type("admin");
    cy.get(".my-2").click();
    cy.get(
      '[href="http://localhost:3000/admin/dashboard/#/licenseType"]'
    ).click();
    cy.get(
      ".RaDatagrid-rowEven-75 > .column-undefined > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
    cy.get(
      ".MuiToolbar-root > .MuiButtonBase-root > .MuiButton-label > .RaButton-label-7"
    ).click();
  });
});
