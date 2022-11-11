describe('Product list', () => {
  const given = () => {
    cy.visit('http://localhost:4200/products');

    return {
      productList: () => cy.get('[data-selector="product-container"]'),
    };
  };

  it('should display products list', () => {
    const { productList } = given();
    productList().should('have.length', 20)
  })
})
