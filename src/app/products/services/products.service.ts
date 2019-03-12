import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductItemModel } from '../models/product-item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) {
  }

  getProducts(): Observable<ProductItemModel[]> {
    return this.firestore.collection<ProductItemModel[]>('products').snapshotChanges()
      .pipe(map((products) => {
        return products.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        }) as any[];
      }));
  }

  getProductById(id: string): Observable<ProductItemModel> {
    return this.firestore
      .doc<ProductItemModel>(`products/${id}`)
      .get()
      .pipe(
        map((resp) => ({
          id: resp.id,
          ...resp.data()
        }) as ProductItemModel)
      );
  }

  updateProduct(product: ProductItemModel): Promise<void> {
    return this.firestore.doc(`products/${product.id}`).update(product);
  }

  addProduct(product: ProductItemModel): Promise<ProductItemModel> {
    return this.firestore.collection('products')
      .add(product)
      .then((resp) => ({
        id: resp.id,
        ...product
      }));
  }


  deleteProduct(id: string): Promise<any> {
    console.log(`Lets pretend that product with id ${id} was successfully deleted ;)`);
    return of(null).toPromise();
    // return this.firestore.doc('products/' + id).delete();
  }
}
