import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsGridComponent } from './leave-details-grid.component';

describe('LeaveDetailsGridComponent', () => {
  let component: LeaveDetailsGridComponent;
  let fixture: ComponentFixture<LeaveDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
