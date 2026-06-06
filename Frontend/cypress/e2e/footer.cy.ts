describe("Footer E2E Tests", () => {
  it("No debe renderizar el footer en la página de login/registro", () => {
    cy.visit("/auth");
    cy.get("footer").should("not.exist");
  });

  it("El footer debe ser responsivo y visualizarse correctamente en diferentes pantallas", () => {
    cy.visit("/welcome");

    cy.viewport(1280, 800);
    cy.get("footer").should("be.visible");

    cy.viewport("iphone-6");
    cy.get("footer").should("be.visible");
  });
});
