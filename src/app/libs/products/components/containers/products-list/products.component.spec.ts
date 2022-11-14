import { ProductsComponent } from './products.component';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from '../../../services/products/products.service';
import { of } from 'rxjs';
import { ProductListPage } from './product-list.page-object';
import { ProductModel } from '../../../models/product.model';
import { ANALYTICS_SERVICE } from '../../../../shared/services/analytics/analytics.service';
import { ProductsComponentModule } from './products.component-module';
import {
  APPLICATION_CONTEXT_TEST_PROVIDER
} from '../../../../shared/services/context/application-context-test.provider';
import { ANALYTICS_SERVICE_TEST_PROVIDER } from '../../../../shared/services/analytics/analytics-service-test.provider';
import { CLOCK_TEST_PROVIDER } from '../../../../shared/services/clock/clock-test.provider';
import objectContaining = jasmine.objectContaining;
import { CommonModule } from '@angular/common';
import {
  SendAnalyticsDirectivesModule
} from '../../../../shared/directives/send-analytics-on-click/send-analytics-directives.module';
import { FormatPricePipeModule } from '../../../../shared/pipes/price/format-price-pipe.module';
import {
  FakeStarsComponent,
  StarsComponentTestingModule
} from '../../../../shared/components/stars/stars.component.testing-module';
import { RATING_SERVICE } from '../../../services/rate/rating-service';

describe('ProductsComponent', () => {
  const given = async (data: {
    givenProducts: ProductModel[]
  }) => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SendAnalyticsDirectivesModule, FormatPricePipeModule, StarsComponentTestingModule ],
      declarations: [ProductsComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of(data.givenProducts)
          }
        },
        {
          provide: RATING_SERVICE,
          useValue: {
            add: () => of(void 0)
          }
        },
        ANALYTICS_SERVICE_TEST_PROVIDER,
        APPLICATION_CONTEXT_TEST_PROVIDER,
        CLOCK_TEST_PROVIDER,
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();

    return {
      productListPage: new ProductListPage(fixture),
      analyticServiceAddSpy: spyOn(TestBed.inject(ANALYTICS_SERVICE), 'add').and.callThrough(),
      rateServiceAddSpy: spyOn(TestBed.inject(RATING_SERVICE), 'add'),
    }
  };

  const productModel = [
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
  ];

  it('should display products',async () => {
    const { productListPage } = await given({
      givenProducts: productModel
    });
    const productsNodes = productListPage.getProductWrapper();

    expect(productsNodes.length).toEqual(2);
  });

  it('should display product elements', async() => {
    const { productListPage } = await given({
      givenProducts: productModel
    });

    expect(productListPage.titleFor('__PRODUCT_ID_1__')).toContain("__PRODUCT_TITLE_1__");
    expect(productListPage.descriptionFor('__PRODUCT_ID_1__')).toEqual('__PRODUCT_DESCRIPTION_1__');
    expect(productListPage.priceFor('__PRODUCT_ID_1__')).toEqual('123.56 zł');
    expect(productListPage.allReviewsFor('__PRODUCT_ID_1__')).toEqual('All reviews: 234');
    expect(productListPage.cartButtonFor('__PRODUCT_ID_1__')).toEqual('Add to cart');
    expect(productListPage.imageFor('__PRODUCT_ID_1__')).toEqual('__PRODUCT_IMAGE_1__');
    expect(productListPage.hasDetailsButtonFor('__PRODUCT_ID_1__')).toBeTrue();
  });

  it('should display rating', async() => {
    const { productListPage } = await given({
      givenProducts: productModel
    });

    const ratingComponent = productListPage.ratingFor('__PRODUCT_ID_1__').componentInstance;

    expect(ratingComponent.rate).toEqual(5);
  });

  it('should save selected rating', async() => {
    const { productListPage, rateServiceAddSpy } = await given({
      givenProducts: productModel
    });

    const ratingComponent = productListPage.ratingFor('__PRODUCT_ID_1__').componentInstance;
    ratingComponent.rateSelected.emit(10);

    expect(rateServiceAddSpy).toHaveBeenCalledWith(10);
  });

  it('should sent analytics when details button clicked', async () => {
    const { productListPage, analyticServiceAddSpy } = await given({
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

    productListPage.clickDetailsButton('__PRODUCT_ID_1__');

    expect(analyticServiceAddSpy).toHaveBeenCalledWith(objectContaining({
      data: objectContaining({
        elementName: 'details-button',
      })
    }));
  });

  it('should sent analytics when add to cart button clicked', async () => {
    const {productListPage, analyticServiceAddSpy} = await given({
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

    productListPage.clickAddToCartButton('__PRODUCT_ID_1__');

    expect(analyticServiceAddSpy).toHaveBeenCalledWith(objectContaining({
      data: objectContaining({
        elementName: 'add-to-cart-button',
      })
    }));
  });
});
