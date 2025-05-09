import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalExaminationComponent } from './medical-examination.component';

describe('MedicalExaminationComponent', () => {
  let component: MedicalExaminationComponent;
  let fixture: ComponentFixture<MedicalExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
