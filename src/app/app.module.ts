import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedallionComponent } from './medallion/medallion.component';
import { PanelComponent } from './panel/panel.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, MedallionComponent, PanelComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
