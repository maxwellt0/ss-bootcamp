import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatIconModule, MatDialogModule
} from '@angular/material';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsService } from './services/products.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AddNewProductComponent } from './modals/add-new-product/add-new-product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductListItemComponent,
    FilterPipe,
    ProductDetailComponent,
    ProductFormComponent,
    AddNewProductComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    ProductsRoutingModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [ProductsService, {provide: FirestoreSettingsToken, useValue: {}}],
  exports: [ProductsListComponent],
  entryComponents: [AddNewProductComponent]
})
export class ProductsModule {
}
