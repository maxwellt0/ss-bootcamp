import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailsResolver } from './resolvers/product-detail.resolver';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':categoryId',
        component: ProductsListComponent,
      },
      {
        path: ':categoryId/:productId',
        component: ProductDetailComponent,
        resolve: {
          detailData: ProductDetailsResolver
        }
      },
      {
        path: '',
        redirectTo: 'all'
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ProductDetailsResolver]
})
export class ProductsRoutingModule {
}
