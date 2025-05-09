import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReimburesmentComponent } from './medical-reimburesment.component';

describe('MedicalReimburesmentComponent', () => {
  let component: MedicalReimburesmentComponent;
  let fixture: ComponentFixture<MedicalReimburesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReimburesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReimburesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
