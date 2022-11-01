import { NgModule } from '@angular/core';
import { FormatPricePipe } from './format-price.pipe';

@NgModule({
  declarations: [FormatPricePipe],
  exports: [FormatPricePipe]
})
export class FormatPricePipeModule {}
