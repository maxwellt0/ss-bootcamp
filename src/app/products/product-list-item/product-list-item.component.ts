import { Component, OnInit, Input } from '@angular/core';
import { ProductItemModel } from '../models/product-item.model';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'boot-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input()
  product: ProductItemModel;
  isAdmin: boolean;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  deleteItem(ev): void {
    ev.stopPropagation();
    this.productsService.deleteProduct(this.product.id);
  }

}
