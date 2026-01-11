describe('Favourites Functionality', () => {
  beforeEach(() => {
    cy.setupApiMocks();
    cy.visit('/');
    cy.clearLocalStorage();
    cy.wait('@getCategories');
    cy.wait('@getProducts');
  });

  it('should add product to favourites from home page', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.contains('Added to favourites!').should('be.visible');
  });

  it('should remove product from favourites', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.contains('Removed from favourites').should('be.visible');
  });

  it('should show favourites count in navigation', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.contains('Favourites').parent().should('contain', '1');
  });

  it('should display favourites on favourites page', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.contains('Favourites').click();
    cy.url().should('include', '/favourites');
    cy.get('[data-testid="product-card"]').should('have.length', 1);
  });

  it('should persist favourites after page reload', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.reload();
    cy.wait('@getCategories');
    cy.wait('@getProducts');
    cy.contains('Favourites').parent().should('contain', '1');
  });

  it('should add to favourites from product detail page', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="favourite-btn"]').click();
    cy.contains('Added to favourites!').should('be.visible');
  });
});
