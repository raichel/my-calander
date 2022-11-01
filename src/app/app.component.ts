import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalanderFirebaseService } from './calander-firebase.service';
import { ThemeFirebaseService } from './theme-firebase.service';
import { ICalander, IMedallion, ICalanderTheme } from './calander.interfaces';
import { MedallionDialogComponent } from './medallion-dialog/medallion-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentCalander: ICalander | undefined;
  currentTheme: ICalanderTheme | undefined;
  availableThemes!: ICalanderTheme[];
  CAL_ID = 'KBC9R47L5sTbrsnbFkLJ';

  constructor(
    private dialog: MatDialog,
    private calanderService: CalanderFirebaseService,
    private themeService: ThemeFirebaseService
  ) {}

  onThemeSelected(themeId: string) {
    this.currentTheme = this.availableThemes.find((cal) => cal.id == themeId);
    if (this.currentCalander) this.currentCalander.themeId = themeId;
  }

  ngOnInit() {
    this.themeService.getAll().subscribe((data) => {
      this.availableThemes = data;
    });
    this.calanderService
      .getById(this.CAL_ID)
      .valueChanges()
      .subscribe((data) => {
        if (data != undefined) {
          this.currentCalander = data;
          this.currentCalander.medallions.forEach((medallion: any) => {
            medallion.birthday = medallion.birthday.toDate();
          });
          // Load the theme for this this.currentCalander
          this.themeService
            .getById(this.currentCalander.themeId)
            .valueChanges()
            .subscribe((data) => {
              if (data != undefined) {
                this.currentTheme = data;
              }
            });
        }
      });
  }

  updateCalander(id: string, calander: ICalander): void {
    this.calanderService
      .edit(id, calander)
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
    this.dialog
      .open(MedallionDialogComponent, {
        width: '600px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          medallion: medallion,
          medallionThemes: this.currentTheme
            ? this.currentTheme.medallions
            : [],
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          medallion.name = result['name'];
          medallion.birthday = result['birthday'];
          medallion.medalThemeId = result['medalThemeId'];
        }
      });
  }

  onAddMedallionClick(): void {
    if (!this.currentCalander) return;
    this.currentCalander.medallions.push({
      name: 'ישראל',
      birthday: new Date(),
      // Select a random image from the selected theme's medallions
      medalThemeId: this.currentTheme
        ? Math.floor(Math.random() * this.currentTheme.medallions.length)
        : 0,
    });
    this.updateCalander(this.CAL_ID, this.currentCalander);
  }
}
