import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { ProductItemModel } from '../models/product-item.model';

@Injectable()
export class ProductDetailsResolver implements Resolve<any> {
  constructor(
    private productsService: ProductsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<ProductItemModel> {
    return this.productsService.getProductById(route.params.productId).toPromise()
      .then((product: ProductItemModel) => {
        return product;
      });
  }

}
