import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedallionDialogComponent } from './medallion-dialog.component';

describe('MedallionDialogComponent', () => {
  let component: MedallionDialogComponent;
  let fixture: ComponentFixture<MedallionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedallionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedallionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
