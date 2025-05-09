import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeGridComponent } from './leave-type-grid.component';

describe('LeaveTypeGridComponent', () => {
  let component: LeaveTypeGridComponent;
  let fixture: ComponentFixture<LeaveTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
