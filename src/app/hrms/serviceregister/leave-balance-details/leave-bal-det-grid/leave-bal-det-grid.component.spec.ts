import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalDetGridComponent } from './leave-bal-det-grid.component';

describe('LeaveBalDetGridComponent', () => {
  let component: LeaveBalDetGridComponent;
  let fixture: ComponentFixture<LeaveBalDetGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalDetGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalDetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
