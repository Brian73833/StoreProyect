describe("Register E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="tab-register"]').click();
  });

  it("Validar el formato de email y fortaleza de contraseñas", () => {
    cy.get('[data-cy="register-name"]').type("TestUser");
    cy.get('[data-cy="register-email"]').type("invalidemail");
    cy.get('[data-cy="register-password"]').type("123");
    cy.get('[data-cy="register-confirm-password"]').type("123");

    cy.get('[data-cy="register-submit"]').click();
    cy.contains("Correo inválido.").should("be.visible");
    cy.contains("Debe ser más robusta.").should("be.visible");
  });

  it("Verificar que el formulario de registro funcione correctamente", () => {
    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
    cy.get('[data-cy="register-name"]').type("TestUser");
    cy.get('[data-cy="register-email"]').type(uniqueEmail);
    cy.get('[data-cy="register-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-confirm-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-submit"]').click();

    cy.url().should("not.include", "/auth");
  });
});
