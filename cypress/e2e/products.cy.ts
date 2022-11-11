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


  it('should send analytics when add to cart button clicked', () => {
    const { firstItemAddToCartButton } = given();

    cy.intercept('POST', '**/my/api/path').as('postAnalytics')

    firstItemAddToCartButton().click();

    cy.wait('@postAnalytics').should(({ request, response }) => {
      expect(request.body).to.have.property('data');
      expect(response?.statusCode).to.be.eq(200);
    })
  });
})
