import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [ProductsComponent, ProductsListComponent, ProductListItemComponent, FilterPipe],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ProductsRoutingModule
  ],
  providers: [ProductsService, { provide: FirestoreSettingsToken, useValue: {} }],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
