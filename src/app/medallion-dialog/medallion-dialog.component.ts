import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMedallion } from '../calander.interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-medallion-dialog',
  templateUrl: './medallion-dialog.component.html',
  styleUrls: ['./medallion-dialog.component.css'],
})
export class MedallionDialogComponent {
  medallion!: IMedallion;
  name: string = 'ישראל ישראלי';
  birthday: Date = new Date('12/15/1973');

  constructor(
    public dialogRef: MatDialogRef<MedallionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.medallion = data.medallion;
  }

  onDoneClicked() {
    this.dialogRef.close({ name: this.name, birthday: this.birthday });
  }
}
