import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedallionComponent } from './medallion.component';

describe('MedallionComponent', () => {
  let component: MedallionComponent;
  let fixture: ComponentFixture<MedallionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedallionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedallionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
