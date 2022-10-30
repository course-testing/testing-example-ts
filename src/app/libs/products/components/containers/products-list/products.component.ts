import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { ProductModel } from '../../../models/product.model';
import { Observable, switchMap, take } from 'rxjs';
import { ANALYTICS_SERVICE, AnalyticsService } from '../../../services/analytics/analytics.service';
import { APPLICATION_CONTEXT, ApplicationContext } from '../../../services/context/application-context';
import { ApplicationContextModel } from '../../../models/application-context.model';
import { CLOCK, Clock } from '../../../../shared/services/clock/clock';

@Component({
  selector: 'app-products-list',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly products$: Observable<ProductModel[]> = this._productsService.getProducts();

  constructor(
    private _productsService: ProductsService,
    @Inject(ANALYTICS_SERVICE) private _addsAnalytics: AnalyticsService,
    @Inject(APPLICATION_CONTEXT) private _getsContextData: ApplicationContext,
    @Inject(CLOCK) private _currentTime: Clock,
  ) {}

  sendAnalytics(elementName: string) {
      this._getsContextData
        .get()
        .pipe(
          switchMap((context: ApplicationContextModel) =>
            this._addsAnalytics.add({
              type: 'click',
              data: {
                elementName,
                partnerId: '__PARTNER_ID__',
                timestamp: this._currentTime.toTimeString()
              },
            })
          ),
          take(1)
        )
        .subscribe();
  }
}
