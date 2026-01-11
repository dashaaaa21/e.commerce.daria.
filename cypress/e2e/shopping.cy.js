describe('E-Commerce Shopping Flow', () => {
  beforeEach(() => {
    cy.setupApiMocks();
    cy.visit('/');
    cy.clearLocalStorage();
    cy.wait('@getCategories');
    cy.wait('@getProducts');
  });

  it('should load the home page', () => {
    cy.contains('New Clothes').should('be.visible');
  });

  it('should search for products', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('input[placeholder="Search clothes..."]').should('not.be.disabled').type('shirt');
    cy.wait(500);
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should filter by category', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.contains('button', "men's clothing").click();
    cy.wait('@getProductsByCategory');
    cy.get('[data-testid="product-card"]').should('exist');
  });

  it('should sort products by price', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('select').select('Price: Low to High');
    cy.wait(500);
    cy.get('[data-testid="product-card"]').should('exist');
  });

  it('should add product to cart', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.contains('Added to cart!').should('be.visible');
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should add product to favourites', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="favourite-btn"]').click();
    });
    cy.contains('Added to favourites!').should('be.visible');
  });

  it('should navigate to product detail page', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().click();
    cy.url().should('include', '/product/');
    cy.contains('Add to Cart').should('be.visible');
  });

  it('should view cart page', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
    cy.contains('Shopping Cart').should('be.visible');
  });

  it('should update quantity in cart', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains('button', '+').click();
    cy.wait(500);
    cy.get('[data-testid="cart-count"]').should('contain', '2');
  });

  it('should remove item from cart', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains('button', 'Remove').click();
    cy.contains('Removed from cart').should('be.visible');
  });

  it('should navigate to favourites page', () => {
    cy.contains('Favourites').click();
    cy.url().should('include', '/favourites');
  });

  it('should persist cart in localStorage', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.reload();
    cy.wait('@getCategories');
    cy.wait('@getProducts');
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should clear entire cart', () => {
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains('Clear Cart').click();
    cy.contains('Cart cleared').should('be.visible');
  });
});
