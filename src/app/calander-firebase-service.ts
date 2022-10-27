import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ICalander, IMedallion } from './calander.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalanderFirebaseService {
  private dbPath = '/calanders';

  calanders: AngularFirestoreCollection<ICalander>;

  constructor(private store: AngularFirestore) {
    this.calanders = store.collection(this.dbPath);
  }

  getById(id: string) {
    return this.calanders.doc(id);
  }

  add(calander: any): any {
    return this.calanders.add({ ...calander });
  }

  edit(id: string, data: any) {
    return this.calanders.doc(id).update(data);
  }

  delete(key: string) {
    return this.calanders.doc(key).delete();
  }

  // getAll(): AngularFirestoreCollection<ICalander> {
  //   return this.calandersRef;
  // }

  // create(calander: ICalander): any {
  //   return this.calandersRef.add({ ...calander });
  // }

  // update(id: string, data: any): Promise<void> {
  //   return this.calandersRef.doc(id).update(data);
  // }

  // delete(id: string): Promise<void> {
  //   return this.calandersRef.doc(id).delete();
  // }

  // async get(id: string) {
  //   let result!: ICalander;
  //   const ref = doc(this.firestore, 'calanders', id).withConverter(
  //     this.calanderConverter
  //   );
  //   const docSnap = await getDoc(ref);
  //   if (docSnap.exists()) {
  //     // Convert to Calander object
  //     result = docSnap.data() as ICalander;
  //     // Use a Calander instance method
  //   } else {
  //     console.log('No such document!');
  //   }
  //   return result;
  // }

  // // Firestore data converter
  // calanderConverter = {
  //   toFirestore: (calander: ICalander) => {
  //     return {
  //       title: calander.title,
  //       medallions: calander.medallions.map((medallion: IMedallion) => {
  //         return {
  //           name: medallion.name,
  //           birthday: medallion.birthday,
  //         };
  //       }),
  //     };
  //   },
  //   fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
  //     const data = snapshot.data(options);
  //     if (data == null) return;
  //     return {
  //       title: data['name'],
  //       medallions: data['medallions'].map((medallion: any) => {
  //         return {
  //           name: medallion['name'],
  //           birthday: medallion['birthday'].toDate(),
  //         };
  //       }),
  //     };
  //   },
  // };
}
