import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
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

  getById(id: string) {
    return this.themes.doc(id);
  }
}
