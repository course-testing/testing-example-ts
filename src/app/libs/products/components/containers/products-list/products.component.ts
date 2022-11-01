import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { ProductModel } from '../../../models/product.model';
import { Observable, switchMap, take } from 'rxjs';
import { ANALYTICS_SERVICE, AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { APPLICATION_CONTEXT, ApplicationContext } from '../../../../shared/services/context/application-context';
import { ApplicationContextModel } from '../../../../shared/models/application-context.model';
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
}
