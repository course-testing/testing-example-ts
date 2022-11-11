describe('Product list', () => {
  const given = () => {
    cy.visit('http://localhost:4200/products');

    const productList = () => cy.get('[data-selector="product-container"]')

    return {
      productList,
      firstItemTitle: () => productList().first().find('[data-cy="product-title"]'),
    };
  };

  it('should display products list', () => {
    const { productList } = given();
    productList().should('have.length', 20)
  })

  it('should display product elements', () => {
    const { firstItemTitle } = given();

    firstItemTitle()
      .should('exist');
  })
})
