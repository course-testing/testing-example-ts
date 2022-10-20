import { ProductsComponent } from './products.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: SpyObj<ProductsService>;

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
  });

  it('should display products',() => {
    fixture.detectChanges();
    const productsNodes = fixture.debugElement.queryAll(By.css(`[data-selector="product-container"]`));

    expect(productsNodes.length).toEqual(2);
  });

  it('should display product elements', () => {
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css(`[data-selector="product-title-__PRODUCT_ID_1__"]`));

    expect(title.properties['innerText']).toContain("__PRODUCT_TITLE_1__");
  });
});
