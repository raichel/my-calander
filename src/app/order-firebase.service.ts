import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IOrder } from './calander.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderFirebaseService {
  private COLLECTION_NAME = 'orders';

  orders: AngularFirestoreCollection<IOrder>;

  constructor(private store: AngularFirestore) {
    this.orders = store.collection(`/${this.COLLECTION_NAME}`);
  }

  getAll(): Observable<IOrder[]> {
    return this.orders.valueChanges({ idField: 'id' });
  }

  getById(id: string) {
    return this.orders.doc(id).valueChanges({ idField: 'id' });
  }

  createOrUpdate(order: IOrder): any {
    // If the order already has an ID, call "edit", else call "add"
    if (order.id) return this.orders.doc(order.id).update(order);
    else return this.orders.add({ ...order });
  }

  delete(id: string) {
    return this.orders.doc(id).delete();
  }
}
