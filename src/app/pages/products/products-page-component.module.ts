import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule } from '@angular/router';
import {
  ProductsComponentModule
} from '../../libs/products/components/containers/products-list/products.component-module';
import { ProductsService } from '../../libs/products/services/products/products.service';

@NgModule({
  imports: [
    CommonModule,
    ProductsComponentModule,
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
