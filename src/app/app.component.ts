import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  calanderCollection: CollectionReference<DocumentData>;

  constructor(
    private dialog: MatDialog,
    private readonly firestore: Firestore
  ) {
    this.calanderCollection = collection(this.firestore, 'calanders');
  }

  getAll() {
    return collectionData(this.calanderCollection, {
      idField: 'id',
    }) as Observable<ICalander[]>;
  }

  get(id: string) {
    const calanderDocumentReference = doc(this.firestore, `calanders/${id}`);
    return docData(calanderDocumentReference, { idField: 'id' });
  }

  create(calander: ICalander) {
    return addDoc(this.calanderCollection, calander);
  }

  update(calander: ICalander) {
    const calanderDocumentReference = doc(
      this.firestore,
      `calander/${calander.id}`
    );
    return updateDoc(calanderDocumentReference, { ...calander });
  }

  delete(id: string) {
    const calanderDocumentReference = doc(this.firestore, `calander/${id}`);
    return deleteDoc(calanderDocumentReference);
  }

  calander: ICalander = {
    id: 1,
    title: 'First Calander',
    medallions: [
      { name: 'Meirav', birthday: new Date('11-03-1977') },
      { name: 'Eran', birthday: new Date('12-15-1973') },
      { name: 'Itamar', birthday: new Date('08-14-2009') },
      { name: 'Amitai', birthday: new Date('09-08-2011') },
      { name: 'Beeri', birthday: new Date('07-05-2014') },
    ],
  };

  onMedallionClick(
    medallion: IMedallion,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(`Medallion ${medallion.name} has been clicked`);
    this.dialog.open(MedallionDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        medallion: medallion,
      },
    });
  }

  onAddMedallionClick(): void {
    console.log(`Add Medallion clicked`);
    this.calander.medallions.push({
      name: 'new name',
      birthday: new Date(),
    });
    this.create(this.calander);
  }
}

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './medallion/medallion-dialog.html',
})
export class MedallionDialog {
  medallion: IMedallion;

  constructor(
    public dialogRef: MatDialogRef<MedallionDialog>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.medallion = data.medallion;
  }
}

export interface ICalander {
  id: number;
  title: string;
  medallions: IMedallion[];
}

export interface IMedallion {
  name: string;
  birthday: Date;
}
