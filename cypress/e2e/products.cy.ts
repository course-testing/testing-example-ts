describe('Product list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/products');
  })

  it('should display products list', () => {
    cy.get('[data-selector="product-container"]').should('have.length', 2)
  })
})
