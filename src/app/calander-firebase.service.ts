import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICalander } from './calander.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalanderFirebaseService {
  private COLLECTION_NAME = 'calanders';

  calanders: AngularFirestoreCollection<ICalander>;

  constructor(private store: AngularFirestore) {
    this.calanders = store.collection(`/${this.COLLECTION_NAME}`);
  }

  getAll(): Observable<ICalander[]> {
    return this.calanders.valueChanges({ idField: 'id' });
  }

  getById(id: string) {
    return this.calanders.doc(id);
  }

  add(calander: ICalander): any {
    return this.calanders.add({ ...calander });
  }

  edit(id: string, calander: ICalander) {
    return this.calanders.doc(id).update(calander);
  }

  delete(id: string) {
    return this.calanders.doc(id).delete();
  }
}
