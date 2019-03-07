import { Component, OnInit, Input } from '@angular/core';
import { ProductItemModel } from '../models/product-item.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'boot-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input()
  product: ProductItemModel;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() { }

  deleteItem(ev): void {
    ev.stopPropagation();
    this.productsService.deleteProduct(this.product.id);
  }

}
