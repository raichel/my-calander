import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMedallion, IMedallionTheme } from '../calander.interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-medallion-dialog',
  templateUrl: './medallion-dialog.component.html',
  styleUrls: ['./medallion-dialog.component.css'],
})
export class MedallionDialogComponent implements OnInit {
  medalThemeId!: string;
  medallionThemes!: IMedallionTheme[];
  medallion!: IMedallion;
  name!: string;
  birthday!: Date;

  constructor(
    public dialogRef: MatDialogRef<MedallionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.medallion = this.data.medallion;
    this.birthday = this.medallion.birthday;
    this.name = this.medallion.name;
    this.medallionThemes = this.data.medallionThemes;
    this.medalThemeId = String(this.medallion.medalThemeId);
  }

  onThemeChanged(themeId: string) {
    this.medalThemeId = themeId;
  }

  onDoneClicked() {
    this.dialogRef.close({
      name: this.name,
      birthday: this.birthday,
      medalThemeId: this.medalThemeId,
    });
  }

  onDeleteClicked() {
    this.dialogRef.close();
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
