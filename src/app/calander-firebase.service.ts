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
    return this.calanders.doc(id).valueChanges({ idField: 'id' });
  }

  createOrUpdate(calander: ICalander): any {
    // If the calander already has an ID, call "edit", else call "add"
    if (calander.id) return this.calanders.doc(calander.id).update(calander);
    else return this.calanders.add({ ...calander });
  }

  delete(id: string) {
    return this.calanders.doc(id).delete();
  }
}
