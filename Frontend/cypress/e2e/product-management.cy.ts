describe("Product Management E2E Tests", () => {
  const loginAsAdmin = () => {
    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
  };

  const loginAsCustomer = () => {
    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type("customer@gmail.com");
    cy.get('[data-cy="login-password"]').type("Customer123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
  };

  context("As a regular user (customer@gmail.com)", () => {
    beforeEach(() => {
      loginAsCustomer();
      cy.visit("/products");
    });

    it("should NOT show admin action buttons in the toolbar", () => {
      cy.get('[data-cy="add-product-btn"]').should("not.exist");
      cy.get('[data-cy="add-category-btn"]').should("not.exist");
    });

    it("should NOT show edit/delete controls on product cards", () => {
      ;
      cy.get('[data-cy="product-card"]').first().trigger("mouseover");
      cy.get('[data-cy="edit-product-btn"]').should("not.exist");
      cy.get('[data-cy="delete-product-btn"]').should("not.exist");
    });
  });

  context("As an administrator (admin@gmail.com)", () => {
    beforeEach(() => {
      loginAsAdmin();
      cy.visit("/products");
    });

    it("should show admin-only buttons in the toolbar", () => {
      cy.get('[data-cy="add-product-btn"]').should("be.visible");
      cy.get('[data-cy="add-category-btn"]').should("be.visible");
    });
  });
});
