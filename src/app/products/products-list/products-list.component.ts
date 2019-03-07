import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { ProductItemModel } from '../models/product-item.model';

@Component({
  selector: 'boot-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductItemModel[];
  searchQuery: string;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.productsService.getProducts().subscribe((products: ProductItemModel[]) => {
        this.products = res.categoryId === 'all' ? products : products.filter(p => p.category.toLowerCase() === res.categoryId);
      });
    });
  }

}
