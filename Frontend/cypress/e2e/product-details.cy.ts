describe("Product Details E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
    cy.visit("/products");
  });

  it("Exist product details page", () => {
    cy.visit("/products").get('[data-cy="products-grid"]').find('[data-cy="product-card"]').first().click();
    cy.url().should("include", "/product/");
  });

  it("Show all product details or error if not found", () => {
    cy.visit("/product/00000000-0000-0000-0000-000000000000");

    cy.get('[data-cy="product-not-found"]').should("be.visible");
    cy.contains("Product Not Found").should("be.visible");

    cy.visit("/products").get('[data-cy="products-grid"]').find('[data-cy="product-card"]').first().click();

    cy.get('[data-cy="product-detail-name"]')
      .should("be.visible")

    cy.get('[data-cy="product-detail-price"]')
      .should("be.visible")

    cy.get('[data-cy="product-detail-stock"]')
      .should("be.visible")

    cy.get('[data-cy="product-detail-description"]')
      .should("be.visible");
  });
});
