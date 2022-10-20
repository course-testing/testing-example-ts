import { ProductsComponent } from './products.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should display products',() => {
    fixture.detectChanges();
    const productsNodes = fixture.debugElement.queryAll(By.css(`[data-selector="product-container"]`));

    expect(productsNodes.length).toEqual(1);
  });
});
