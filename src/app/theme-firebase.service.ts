import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { ICalanderTheme } from './calander.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ThemeFirebaseService {
  private COLLECTION_NAME = 'themes';

  themes: AngularFirestoreCollection<ICalanderTheme>;

  constructor(private store: AngularFirestore) {
    this.themes = store.collection(`/${this.COLLECTION_NAME}`);
  }

  getAll(): Observable<ICalanderTheme[]> {
    return this.themes.valueChanges({ idField: 'id' });
  }

  getById(id: string) {
    return this.themes.doc(id);
  }
}
