import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalanderFirebaseService } from './calander-firebase-service';
import { ICalander, IMedallion } from './calander.interfaces';
import { MedallionDialogComponent } from './medallion-dialog/medallion-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentCalander!: any;
  CAL_ID = 'KBC9R47L5sTbrsnbFkLJ';

  constructor(
    private dialog: MatDialog,
    private calanderService: CalanderFirebaseService
  ) {}

  ngOnInit() {
    this.calanderService
      .getById(this.CAL_ID)
      .valueChanges()
      .subscribe((data) => {
        this.currentCalander = data;
        this.currentCalander.medallions.forEach((medallion: any) => {
          medallion.birthday = medallion.birthday.toDate();
        });
      });
  }

  updateCalander(id: string, data: any): void {
    this.calanderService
      .edit(id, data)
      .then(() => {
        console.log('updated successfully');
      })
      .catch((err: any) => console.log(err));
  }

  deleteCalander(id: string): void {
    this.calanderService
      .delete(id)
      .then(() => {
        console.log('Calander deleted successfully!');
      })
      .catch((err: any) => console.log(err));
  }

  onMedallionClick(
    medallion: IMedallion,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(`Medallion ${medallion.name} has been clicked`);
    this.dialog.open(MedallionDialogComponent, {
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
    this.currentCalander.medallions.push({
      name: 'new name',
      birthday: new Date(),
    });
    this.updateCalander(this.CAL_ID, this.currentCalander);
  }
}
