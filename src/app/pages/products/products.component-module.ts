import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
    {
      path: '',
      component: ProductsPageComponent,
    },
  ]),
  ],
  declarations: [ProductsPageComponent],
  providers: [],
  exports: [ProductsPageComponent]
})
export class ProductsComponentModule {
}
