describe('Product list', () => {
  const given = () => {
    cy.visit('http://localhost:4200/products');

    const productList = () => cy.get('[data-selector="product-container"]')

    return {
      productList,
      firstItemTitle: () => productList().first().find('[data-cy="product-title"]'),
      firstItemAddToCartButton: () => productList().first().find('[data-cy="product-add-to-cart-button"]'),
      firstItemPrice: () => productList().first().find('[data-cy="product-price"]'),
      firstItemImage: () => productList().first().find('[data-cy="product-image"]'),
    };
  };

  it('should display products list', () => {
    const { productList } = given();
    productList().should('have.length', 20)
  })

  it('should display product elements', () => {
    const { firstItemTitle,firstItemAddToCartButton, firstItemImage, firstItemPrice } = given();

    firstItemTitle().should('not.to.match', ':empty');
    firstItemPrice().should('not.to.match', ':empty');
    firstItemAddToCartButton().should('exist');
    firstItemImage().should('exist');
  })
})
