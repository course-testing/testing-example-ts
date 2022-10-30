import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';
import { of } from 'rxjs';
import { ProductsComponentHarness } from './products-component.harness';
import { ProductModel } from '../../../models/product.model';
import { ProductsService } from '../../../services/products/products.service';
import { ANALYTICS_SERVICE } from '../../../services/analytics/analytics.service';

describe('ProductsComponent', () => {
  const  given = async (data: {
    givenProducts: ProductModel[]
  }) => {
    await TestBed.configureTestingModule({
      declarations: [ TestPage, ProductsComponent ],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of(data.givenProducts)
          }
        },
        {
          provide: ANALYTICS_SERVICE,
          useValue: {
            add: () => of(void 0),
          }
        },
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(TestPage);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const componentHarness = await loader.getHarness(ProductsComponentHarness);

    return {
      getProducts: () => componentHarness.getElements('[data-selector="product-container"]'),
      getTitle: async (productId: string) => (await componentHarness.getElement('product-title-' + productId))?.text(),
      getDescription: async (productId: string) => (await componentHarness.getElement('product-description-' + productId))?.text(),
      getPrice: async (productId: string) => (await componentHarness.getElement('product-price-' + productId))?.text(),
      getAllReviews: async (productId: string) => (await componentHarness.getElement('product-all-reviews-' + productId))?.text(),
      getAddToCartButtonText: async (productId: string) => (await componentHarness.getElement('product-add-to-cart-button-' + productId))?.text(),
      isRatingPresent: async (productId: string) => (await componentHarness.getElement('product-rating-' + productId)) !== undefined,
      isDetailsButtonPresent: async (productId: string) => (await componentHarness.getElement('product-details-button-' + productId)) !== undefined,
      isImagePresent: async (productId: string) => (await componentHarness.getElement('product-image-' + productId)),
      clickDetailsButton: async (productId: string) => (await componentHarness.getElement('product-details-button-' + productId))?.click(),
      analyticServiceAddSpy: spyOn(TestBed.inject(ANALYTICS_SERVICE), 'add').and.callThrough(),
    }

  };

  it('should display products', async () => {
    const { getProducts } = await given({
        givenProducts: [
          {
            id: '__PRODUCT_ID_1__',
            title: '__PRODUCT_TITLE_1__',
            price: {
              amount: 123.56,
              currency: 'PLN',
            },
            description: '__PRODUCT_DESCRIPTION_1__',
            category: '__PRODUCT_CATEGORY_1__',
            image: '__PRODUCT_IMAGE_1__',
            rating: {
              rate: 5,
              count: 234
            }
          }, {
            id: '__PRODUCT_ID_2__',
            title: '__PRODUCT_TITLE_2__',
            price: {
              amount: 67.89,
              currency: 'USD',
            },
            description: '__PRODUCT_DESCRIPTION_2__',
            category: '__PRODUCT_CATEGORY_2__',
            image: '__PRODUCT_IMAGE_2__',
            rating: {
              rate: 4,
              count: 56
            }
          }
        ]
    });

    const products = await getProducts();

    expect(products.length).toEqual(2);
  });

  it('should display product elements', async () => {
    const { getTitle, getDescription, getAddToCartButtonText, isDetailsButtonPresent, isRatingPresent, getAllReviews, getPrice, isImagePresent } = await given({
      givenProducts: [
        {
          id: '__PRODUCT_ID_1__',
          title: '__PRODUCT_TITLE_1__',
          price: {
            amount: 123.56,
            currency: 'PLN',
          },
          description: '__PRODUCT_DESCRIPTION_1__',
          category: '__PRODUCT_CATEGORY_1__',
          image: '__PRODUCT_IMAGE_1__',
          rating: {
            rate: 5,
            count: 234
          }
        }
      ]
    });

    const title = await getTitle('__PRODUCT_ID_1__');
    const desc = await getDescription('__PRODUCT_ID_1__');
    const price = await getPrice('__PRODUCT_ID_1__');
    const allReviews = await getAllReviews('__PRODUCT_ID_1__');
    const cartButton = await getAddToCartButtonText('__PRODUCT_ID_1__');
    const image = await isImagePresent('__PRODUCT_ID_1__');
    const rating = await isRatingPresent('__PRODUCT_ID_1__');
    const detailsButton = await isDetailsButtonPresent('__PRODUCT_ID_1__');

    expect(title).toEqual('__PRODUCT_TITLE_1__');
    expect(desc).toEqual('__PRODUCT_DESCRIPTION_1__');
    expect(price).toEqual('123.56 PLN');
    expect(allReviews).toEqual('All reviews: 234');
    expect(cartButton).toEqual('Add to cart');
    expect(detailsButton).toEqual(true);
    expect(rating).toBeTruthy();
    expect(image).toBeTruthy();
  });

  it('should sent analytics when details button clicked', async () => {
    const { clickDetailsButton, analyticServiceAddSpy } = await given({
      givenProducts: [
        {
          id: '__PRODUCT_ID_1__',
          title: '__PRODUCT_TITLE_1__',
          price: {
            amount: 123.56,
            currency: 'PLN',
          },
          description: '__PRODUCT_DESCRIPTION_1__',
          category: '__PRODUCT_CATEGORY_1__',
          image: '__PRODUCT_IMAGE_1__',
          rating: {
            rate: 5,
            count: 234
          }
        }
      ]
    });

    await clickDetailsButton('__PRODUCT_ID_1__');

    expect(analyticServiceAddSpy).toHaveBeenCalledWith({
      type: 'click',
      data: {
        elementName: 'details-button',
        partnerId: '732793f92e4840c240adb0830b2332d5',
        timestamp: '20:43:06 GMT+0200'
      }
    });
  });
});

@Component({
  template: '<app-products-list></app-products-list>',
})
class TestPage {

}
