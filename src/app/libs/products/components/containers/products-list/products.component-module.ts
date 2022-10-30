import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {
  SendAnalyticsDirectivesModule
} from '../../../../shared/directives/send-analytics-on-click/send-analytics-directives.module';

@NgModule({
  imports: [CommonModule, SendAnalyticsDirectivesModule],
  declarations: [ProductsComponent],
  providers: [],
  exports: [ProductsComponent]
})
export class ProductsComponentModule {
}
