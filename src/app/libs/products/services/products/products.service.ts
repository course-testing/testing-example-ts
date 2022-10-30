import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ProductResponse } from './product.response';

@Injectable()
export class ProductsService {
  constructor(private _httpClient: HttpClient) {
  }

  getProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductResponse[]>('https://fakestoreapi.com/products').pipe(
      map((products) => products.map((product) => ({
        ...product,
        price: {
          amount: product.price,
          currency: 'PLN', // get default form config
        }
      })))
    );
  }
}
