import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule } from '@angular/router';
import {
  ProductsComponentModule
} from '../../libs/products/components/containers/products-list/products.component-module';
import { ProductsService } from '../../libs/products/services/products/products.service';
import { GoogleAnalyticsServiceModule } from '../../libs/shared/services/analytics/google-analytics-service.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsComponentModule,
    GoogleAnalyticsServiceModule,
    RouterModule.forChild([
    {
      path: '',
      component: ProductsPageComponent,
    },
  ]),
  ],
  declarations: [ProductsPageComponent],
  providers: [
    ProductsService // TODO close it into module
  ],
  exports: [ProductsPageComponent]
})
export class ProductsPageComponentModule {
}
