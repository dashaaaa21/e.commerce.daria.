describe('Favourites Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('should add product to favourites from home page', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="favourite-btn"]', { timeout: 10000 }).first().click();
    cy.contains('Added to favourites!', { timeout: 5000 }).should('be.visible');
  });

  it('should remove product from favourites', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="favourite-btn"]', { timeout: 10000 }).first().click();
    cy.wait(500);
    cy.get('[data-testid="favourite-btn"]').first().click();
    cy.contains('Removed from favourites', { timeout: 5000 }).should('be.visible');
  });

  it('should show favourites count in navigation', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="favourite-btn"]', { timeout: 10000 }).first().click();
    cy.contains('Favourites').parent().should('contain', '1');
  });

  it('should display favourites on favourites page', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="favourite-btn"]', { timeout: 10000 }).first().click();
    cy.contains('Favourites').click();
    cy.url().should('include', '/favourites');
    cy.get('[data-testid="product-card"]').should('have.length', 1);
  });

  it('should persist favourites after page reload', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="favourite-btn"]', { timeout: 10000 }).first().click();
    cy.reload();
    cy.contains('Favourites').parent().should('contain', '1');
  });

  it('should add to favourites from product detail page', () => {
    cy.get('[data-testid="product-card"]', { timeout: 15000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().click();
    cy.get('[data-testid="favourite-btn"]').click();
    cy.contains('Added to favourites!', { timeout: 5000 }).should('be.visible');
  });
});
