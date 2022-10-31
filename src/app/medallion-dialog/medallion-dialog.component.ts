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
  name!: string;
  birthday!: Date;

  constructor(
    public dialogRef: MatDialogRef<MedallionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.medallion = data.medallion;
    this.birthday = this.medallion.birthday;
    this.name = this.medallion.name;
  }

  onDoneClicked() {
    this.dialogRef.close({ name: this.name, birthday: this.birthday });
  }
}
