describe("Login E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });

  it("Almacenar datos del usuario para persistencia", () => {
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();

    cy.window().its("localStorage").invoke("getItem", "user").should("not.be.null");
    cy.reload();
    cy.window().its("localStorage").invoke("getItem", "user").should("not.be.null");
  });

  it("Verificar que el formulario de login funcione correctamente", () => {
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
  });
});
