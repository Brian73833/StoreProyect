describe("Products Catalog E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
    cy.visit("/products");
  });

  it("Mostrar la lista de productos", () => {
    cy.get('[data-cy="products-grid"]')
      .find('[data-cy="product-card"]')
      .should("have.length.at.least", 1)
  });
});
