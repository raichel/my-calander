import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMedallion } from '../calander.interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medallion-dialog',
  templateUrl: './medallion-dialog.component.html',
  styleUrls: ['./medallion-dialog.component.css'],
})
export class MedallionDialogComponent {
  medallion: IMedallion;

  constructor(
    public dialogRef: MatDialogRef<MedallionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.medallion = data.medallion;
  }
}
