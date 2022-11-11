import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponentModule } from './pages/products/products-page-component.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ProductsPageComponentModule,
  },
  {
    path: 'products',
    loadChildren: () => ProductsPageComponentModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsPageComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
