import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { ProductItemModel } from '../models/product-item.model';
import { MatDialog } from '@angular/material';
import { AddNewProductComponent } from '../modals/add-new-product/add-new-product.component';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'boot-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductItemModel[];
  searchQuery: string;
  isAdmin: boolean;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.productsService.getProducts().subscribe((products: ProductItemModel[]) => {
        this.products = res.categoryId === 'all' ? products : products.filter(p => p.category.toLowerCase() === res.categoryId);
      });
    });

    this.isAdmin = this.authService.isAdmin();
  }

  openAddNewProduct(): void {
    const dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '450px',
      data: {
        name: null,
        description: null,
        price: null,
        category: null,
        imgUrl: null,
        isHidden: null
      }
    });

    dialogRef.afterClosed().pipe(
      filter((product) => !!product),
      switchMap((product: any) => this.productsService.addProduct(product)),
      tap((product: any) => this.products.push(product))
    ).subscribe();
  }

}
