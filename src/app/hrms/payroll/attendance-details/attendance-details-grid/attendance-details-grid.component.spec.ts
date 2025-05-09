import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsGridComponent } from './attendance-details-grid.component';

describe('AttendanceDetailsGridComponent', () => {
  let component: AttendanceDetailsGridComponent;
  let fixture: ComponentFixture<AttendanceDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
