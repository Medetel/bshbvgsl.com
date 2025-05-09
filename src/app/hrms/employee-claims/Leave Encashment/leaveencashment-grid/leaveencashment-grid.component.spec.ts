import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveencashmentGridComponent } from './leaveencashment-grid.component';

describe('LeaveencashmentGridComponent', () => {
  let component: LeaveencashmentGridComponent;
  let fixture: ComponentFixture<LeaveencashmentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveencashmentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveencashmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
