describe("Profile Update E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="tab-register"]').click();

    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
    cy.get('[data-cy="register-name"]').type("User");
    cy.get('[data-cy="register-email"]').type(uniqueEmail);
    cy.get('[data-cy="register-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-confirm-password"]').type("Contraseña123!");
    cy.get('[data-cy="register-submit"]').click();

    cy.url().should("not.include", "/auth");
    cy.visit("/profile");
  });

  it("show the update form when click in edit button", () => {
    cy.get('[data-cy="profile-edit-btn"]').click();

    cy.get('[data-cy="profile-name"]').should("not.be.disabled");
    cy.get('[data-cy="profile-email"]').should("not.be.disabled");
  });

  it("update profile form should work correctly", () => {
    cy.get('[data-cy="profile-edit-btn"]').click();

    cy.get('[data-cy="profile-name"]').clear().type("UpdatedUser");
    cy.get('[data-cy="profile-email"]').clear().type("updateduser@gmail.com");

    cy.get('[data-cy="profile-save-btn"]').click();

    cy.get('[data-cy="profile-success-message"]').should("be.visible").and("contain.text", "Información actualizada correctamente");
  });
});
