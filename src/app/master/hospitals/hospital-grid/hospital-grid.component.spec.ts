import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalGridComponent } from './hospital-grid.component';

describe('HospitalGridComponent', () => {
  let component: HospitalGridComponent;
  let fixture: ComponentFixture<HospitalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
