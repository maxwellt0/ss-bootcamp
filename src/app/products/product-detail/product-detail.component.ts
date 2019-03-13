import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ProductItemModel } from '../models/product-item.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'boot-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductItemModel;
  isEditMode: boolean;
  isAdmin: boolean;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadProduct();

    this.isAdmin = this.authService.isAdmin();
  }

  deleteItem(ev): void {
    ev.stopPropagation();
    this.productsService.deleteProduct(this.product.id).then(() => {
      this.router.navigate(['/products/all']);
    });
  }

  private loadProduct() {
    this.activatedRoute.data.pipe(
      tap((res: any) => this.product = res.detailData)
    ).subscribe();
  }

  editModeOn() {
    this.isEditMode = true;
  }

  editModeOff() {
    this.isEditMode = false;
  }

  saveProduct() {
    this.productsService.updateProduct(this.product).then(() => this.isEditMode = false);
  }

}
