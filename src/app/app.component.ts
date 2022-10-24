import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMedallion } from './medallion/medallion.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  title = 'My Calander';

  medallions: IMedallion[] = [
    { id: 1, name: 'Meirav', birthday: new Date('11-03-1977') },
    { id: 2, name: 'Eran', birthday: new Date('12-15-1973') },
    { id: 3, name: 'Itamar', birthday: new Date('08-14-2009') },
    { id: 4, name: 'Amitai', birthday: new Date('09-08-2011') },
    { id: 4, name: 'Beeri', birthday: new Date('07-05-2014') },
  ];

  onMedallionClick(
    medallionId: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(`Medallion ${medallionId} has been clicked`);
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onAddMedallionClick(): void {
    console.log(`Add Medallion clicked`);
    this.medallions.push({
      id: this.medallions.length,
      name: 'new name',
      birthday: new Date(),
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './medallion/medallion-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
