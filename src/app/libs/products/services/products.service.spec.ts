import { TestBed } from '@angular/core/testing';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService
      ]
    });

    service = TestBed.inject(ProductsService);
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

    expect(service.getProducts()).toEqual(expectedProductData);
  });

});
