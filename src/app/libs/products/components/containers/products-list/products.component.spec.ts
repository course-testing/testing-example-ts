import { ProductsComponent } from './products.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: SpyObj<ProductsService>;

  beforeEach(() => {
    productsService = createSpyObj('ProductsService', ['getProducts']);

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
});
