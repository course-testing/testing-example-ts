import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductModel } from '../../../models/product.model';
import { Observable } from 'rxjs';
import { ANALYTICS_SERVICE, AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-products-list',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly products$: Observable<ProductModel[]> = this._productsService.getProducts();

  constructor(private _productsService: ProductsService, @Inject(ANALYTICS_SERVICE) private _addsAnalytics: AnalyticsService) {}

  sendAnalytics() {
    this._addsAnalytics.add({
      type: 'click',
      data: {
        elementName: 'details-button',
        partnerId: '732793f92e4840c240adb0830b2332d5',
        timestamp: '20:43:06 GMT+0200'
      }
    })
  }
}
