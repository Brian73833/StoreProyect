describe("Delete Account E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="tab-register"]').click();

    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
    cy.get('[data-cy="register-name"]').type("TestUser");
    cy.get('[data-cy="register-email"]').type(uniqueEmail);
    cy.get('[data-cy="register-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-confirm-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-submit"]').click();

    cy.url().should("not.include", "/auth");
    cy.visit("/profile");
  });

  it("should expand the delete form and show confirmation message", () => {
    cy.get('[data-cy="profile-delete-trigger-btn"]').should("be.visible").click();

    cy.contains("Confirmar eliminación").should("be.visible");
    cy.get('[data-cy="profile-delete-password"]').should("be.visible");
    cy.get('[data-cy="profile-delete-confirm-btn"]').should("be.visible");
    cy.get('[data-cy="profile-delete-cancel-btn"]').should("be.visible");
  });

  it("should delete the account, clear user data, and redirect to home", () => {
    cy.get('[data-cy="profile-delete-trigger-btn"]').click();
    cy.get('[data-cy="profile-delete-password"]').type("Contraseña123!");
    cy.get('[data-cy="profile-delete-confirm-btn"]').click();
    cy.url().should("not.include", "/profile");
    cy.get('[data-cy="header-login-btn"]').should("be.visible");
  });
});
