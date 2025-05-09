import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReimburesmentGridComponent } from './medical-reimburesment-grid.component';

describe('MedicalReimburesmentGridComponent', () => {
  let component: MedicalReimburesmentGridComponent;
  let fixture: ComponentFixture<MedicalReimburesmentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReimburesmentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReimburesmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
