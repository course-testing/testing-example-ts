import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductModel } from '../../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly products$: Observable<ProductModel[]> = this._productsService.getProducts();

  constructor(private _productsService: ProductsService) {}
}
