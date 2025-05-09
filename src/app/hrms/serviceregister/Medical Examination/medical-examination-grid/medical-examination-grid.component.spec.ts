import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalExaminationGridComponent } from './medical-examination-grid.component';

describe('MedicalExaminationGridComponent', () => {
  let component: MedicalExaminationGridComponent;
  let fixture: ComponentFixture<MedicalExaminationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalExaminationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalExaminationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
