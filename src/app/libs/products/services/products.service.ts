import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private _httpClient: HttpClient) {
  }

  getProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>('https://fakestoreapi.com/products');
  }
}
