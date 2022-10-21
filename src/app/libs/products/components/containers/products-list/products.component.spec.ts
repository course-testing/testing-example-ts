import { ProductsComponent } from './products.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

export class ProductListPage {
  constructor(private _fixture: ComponentFixture<ProductsComponent>) {
  }

  getProductWrapper(): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(`[data-selector="product-container"]`));
  }

  titleFor(productId: string): string {
    return this._getText(
      this._fixture.debugElement.query(By.css(`[data-selector="product-title-${productId}"]`))
    );
  }

  private _getText(element?: DebugElement): string {
    return element && element.properties['innerText'] || '';
  }
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: SpyObj<ProductsService>;
  let productListPage: ProductListPage;

  beforeEach(() => {
    productsService = createSpyObj('ProductsService', ['getProducts']);
    productsService.getProducts.and.returnValue(of([
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
    ]));

    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        {
          provide: ProductsService,
          useValue: productsService
        }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productListPage = new ProductListPage(fixture);
  });

  it('should display products',() => {
    fixture.detectChanges();
    const productsNodes = productListPage.getProductWrapper();

    expect(productsNodes.length).toEqual(2);
  });

  it('should display product elements', () => {
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css(`[data-selector="product-title-__PRODUCT_ID_1__"]`));
    const desc = fixture.debugElement.query(By.css(`[data-selector="product-description-__PRODUCT_ID_1__"]`));
    const price = fixture.debugElement.query(By.css(`[data-selector="product-price-__PRODUCT_ID_1__"]`));
    const allReviews = fixture.debugElement.query(By.css(`[data-selector="product-all-reviews-__PRODUCT_ID_1__"]`));
    const cartButton = fixture.debugElement.query(By.css(`[data-selector="product-add-to-cart-button-__PRODUCT_ID_1__"]`));
    const image = fixture.debugElement.query(By.css(`[data-selector="product-image-__PRODUCT_ID_1__"]`));
    const rating = fixture.debugElement.query(By.css(`[data-selector="product-rating-__PRODUCT_ID_1__"]`));
    const detailsButton = fixture.debugElement.query(By.css(`[data-selector="product-details-button-__PRODUCT_ID_1__"]`));

    expect(productListPage.titleFor('__PRODUCT_ID_1__')).toContain("__PRODUCT_TITLE_1__");
    expect(desc.properties['innerText']).toEqual('__PRODUCT_DESCRIPTION_1__');
    expect(price.properties['innerText']).toEqual('123.56 PLN');
    expect(allReviews.properties['innerText']).toEqual('All reviews: 234');
    expect(cartButton.properties['innerText']).toEqual('Add to cart');
    expect(rating.properties['innerText']).toEqual('5');
    expect(image.properties['src']).toEqual('__PRODUCT_IMAGE_1__');
    expect(detailsButton).toBeTruthy();
  });
});
