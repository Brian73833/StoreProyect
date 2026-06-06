describe("Update Password E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="tab-register"]').click();

    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
    cy.get('[data-cy="register-name"]').type("UserTest");
    cy.get('[data-cy="register-email"]').type(uniqueEmail);
    cy.get('[data-cy="register-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-confirm-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-submit"]').click();


    cy.url().should("not.include", "/auth");
    cy.visit("/profile");
  });

  it("should show error when new password and confirmation do not match", () => {
    cy.get('[data-cy="profile-edit-btn"]').click();
    cy.get('[data-cy="profile-change-password-yes"]').check({ force: true });

    cy.get('[data-cy="profile-current-password"]').type("Contraseña123!");
    cy.get('[data-cy="profile-new-password"]').type("NewPassword123!");
    cy.get('[data-cy="profile-confirm-password"]').type("DifferentPassword123!");

    cy.get('[data-cy="profile-save-btn"]').click();

    cy.get('[data-cy="profile-error-message"]')
      .should("be.visible")
      .and("contain.text", "Las contraseñas nuevas no coinciden");
  });

  it("should show the change password form if user click on yes option", () => {
    cy.get('[data-cy="profile-edit-btn"]').click();
    cy.get('[data-cy="profile-change-password-yes"]').check({ force: true });

    cy.get('[data-cy="profile-current-password"]').should("be.visible");
    cy.get('[data-cy="profile-new-password"]').should("be.visible");
    cy.get('[data-cy="profile-confirm-password"]').should("be.visible");
  });
});
