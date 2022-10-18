import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponentModule } from './pages/products/products.component-module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ProductsComponentModule,
  },
  {
    path: 'products',
    loadChildren: () => ProductsComponentModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
