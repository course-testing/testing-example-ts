import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {
  SendAnalyticsDirectivesModule
} from '../../../../shared/directives/send-analytics-on-click/send-analytics-directives.module';
import { FormatPricePipeModule } from '../../../../shared/pipes/price/format-price-pipe.module';
import { StarsComponentModule } from '../../../../shared/components/stars/stars.component-module';

@NgModule({
  imports: [CommonModule, SendAnalyticsDirectivesModule, FormatPricePipeModule, StarsComponentModule],
  declarations: [ProductsComponent],
  providers: [],
  exports: [ProductsComponent]
})
export class ProductsComponentModule {
}
