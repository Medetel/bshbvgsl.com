import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasescheduleGridComponent } from './phaseschedule-grid.component';

describe('PhasescheduleGridComponent', () => {
  let component: PhasescheduleGridComponent;
  let fixture: ComponentFixture<PhasescheduleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasescheduleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasescheduleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
