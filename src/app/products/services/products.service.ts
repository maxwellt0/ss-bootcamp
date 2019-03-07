import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItemModel } from '../models/product-item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

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

  deleteProduct(id: string): Promise<void> {
    return this.firestore.doc('products/' + id).delete();
  }
}
