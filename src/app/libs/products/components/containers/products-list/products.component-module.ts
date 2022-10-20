import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductsComponent],
  providers: [],
  exports: [ProductsComponent]
})
export class ProductsComponentModule {
}
