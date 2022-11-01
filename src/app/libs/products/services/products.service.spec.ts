import { TestBed } from '@angular/core/testing';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductResponse } from './product.response';

describe('ProductsService', () => {
  const  given = async (response: ProductResponse[]) => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductsService
      ]
    });

    return {
      when: {
        getProducts: () => TestBed.inject(ProductsService).getProducts(),
      },
      then: {
        expectUrl: (expectedUrl: string) => {
          const httpTestingController = TestBed.inject(HttpTestingController);
          const req = httpTestingController.expectOne(expectedUrl);
          req.flush(response);
          httpTestingController.verify();

          return req;
        }
      },
      httpTestingController: TestBed.inject(HttpTestingController)
    }
  };

  it('should return product list', async () => {
    const response: ProductResponse[] = [{
      id: '__PRODUCT_1_ID__',
      title: '__PRODUCT_1_TITLE__',
      price: 123.23,
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
      price: 456.33,
      description: '__PRODUCT_2_DESCRIPTION__',
      category: '__PRODUCT_2_CATEGORY__',
      image: '__PRODUCT_2_IMAGE__',
      rating: {
        rate: 4,
        count: 987
      }
    }];
    const { when, then } = await given(response);

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

    when.getProducts().subscribe(products =>
      expect(products).toEqual(expectedProductData)
    );

    const req = then.expectUrl('https://fakestoreapi.com/products');
    expect(req.request.method).toEqual('GET');
  });

});
