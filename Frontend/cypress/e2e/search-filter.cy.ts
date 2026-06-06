describe("Search and Filter Products E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
    cy.visit("/products");
  });

  it("should dynamically extract categories and populate the category selector", () => {
    cy.get('[data-cy="category-select"]').find("option").should("have.length.at.least", 2);
    cy.get('[data-cy="category-select"] option').first().should("have.text", "Todos los productos");
  });

  it("should show a no-results message when searching a term with no matches", () => {
    cy.get('[data-cy="search-input"]').type("ProductoInexistente");
    cy.get('[data-cy="no-results-message"]').should("be.visible").and("contain.text", "No se encontraron productos.");
    cy.get('[data-cy="product-card"]').should("not.exist");
  });

  it("should filter the product list when a category is selected", () => {
    let categoryName: string;
    cy.get('[data-cy="category-select"] option').eq(2).then((option) => {
      categoryName = option.text().trim();
      cy.get('[data-cy="category-select"]').select(categoryName);
      cy.get('[data-cy="product-card"]').should("have.length.at.least", 1);
      cy.get('[data-cy="product-card"]').first().find('[data-cy="product-category-label"]').should("have.text", categoryName);
    });
  });
});
