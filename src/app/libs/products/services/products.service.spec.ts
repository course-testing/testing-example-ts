import { TestBed } from '@angular/core/testing';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductsService
      ]
    });

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return product list', () => {
    const expectedProductData: ProductModel[] = [{
      id: '__PRODUCT_1_ID__',
      title: '__PRODUCT_1_TITLE__',
      price: {
        amount: 123.23,
        currency: 'PLN',
      },
      description: '__PRODUCT_1_DESCRIPTION__',
      category: '__PRODUCT_1_CATEGORY__',
      image: '__PRODUCT_1_IMAGE__',
      rating: {
        rate: 5,
        count: 567
      }
    }, {
      id: '__PRODUCT_2_ID__',
      title: '__PRODUCT_2_TITLE__',
      price: {
        amount: 456.33,
        currency: 'PLN',
      },
      description: '__PRODUCT_2_DESCRIPTION__',
      category: '__PRODUCT_2_CATEGORY__',
      image: '__PRODUCT_2_IMAGE__',
      rating: {
        rate: 4,
        count: 987
      }
    }];

    service.getProducts().subscribe(products =>
      expect(products).toEqual(expectedProductData)
    );

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toEqual('GET');

    httpTestingController.verify();
  });

});
