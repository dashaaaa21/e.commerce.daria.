describe('E-Commerce Shopping Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('should load the home page', () => {
    cy.contains('New Clothes', { timeout: 10000 }).should('be.visible');
  });

  it('should search for products', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('input[placeholder="Search clothes..."]').should('not.be.disabled').type('shirt');
    cy.wait(500);
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should filter by category', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.contains('button', "men's clothing").click();
    cy.wait(2000);
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).should('exist');
  });

  it('should sort products by price', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('select').select('Price: Low to High');
    cy.wait(500);
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).should('exist');
  });

  it('should add product to cart', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.contains('Added to cart!', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should add product to favourites', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.get('[data-testid="favourite-btn"]').click();
    });
    cy.contains('Added to favourites!', { timeout: 5000 }).should('be.visible');
  });

  it('should navigate to product detail page', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().click();
    cy.url().should('include', '/product/');
    cy.contains('Add to Cart', { timeout: 10000 }).should('be.visible');
  });

  it('should view cart page', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
    cy.contains('Shopping Cart', { timeout: 10000 }).should('be.visible');
  });

  it('should update quantity in cart', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('button').contains('+').click();
    cy.wait(500);
    cy.get('[data-testid="cart-count"]').should('contain', '2');
  });

  it('should remove item from cart', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains('Remove').click();
    cy.contains('Removed from cart', { timeout: 5000 }).should('be.visible');
  });

  it('should navigate to favourites page', () => {
    cy.contains('Favourites').click();
    cy.url().should('include', '/favourites');
  });

  it('should persist cart in localStorage', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.reload();
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should clear entire cart', () => {
    cy.get('[data-testid="product-card"]', { timeout: 30000 }).should('exist');
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains('Clear Cart').click();
    cy.contains('Cart cleared', { timeout: 5000 }).should('be.visible');
  });
});
