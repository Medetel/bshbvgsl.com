import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAttendanceGridComponent } from './monthly-attendance-grid.component';

describe('MonthlyAttendanceGridComponent', () => {
  let component: MonthlyAttendanceGridComponent;
  let fixture: ComponentFixture<MonthlyAttendanceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyAttendanceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAttendanceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
