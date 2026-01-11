Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('setupApiMocks', () => {
  cy.intercept('GET', 'https://fakestoreapi.com/products/categories', { fixture: 'categories.json' }).as('getCategories');
  cy.intercept('GET', 'https://fakestoreapi.com/products/category/*', { fixture: 'products.json' }).as('getProductsByCategory');
  cy.intercept('GET', 'https://fakestoreapi.com/products/[0-9]*', (req) => {
    req.reply({ fixture: 'products.json', statusCode: 200 });
  }).as('getProduct');
  cy.intercept('GET', 'https://fakestoreapi.com/products', { fixture: 'products.json' }).as('getProducts');
});
