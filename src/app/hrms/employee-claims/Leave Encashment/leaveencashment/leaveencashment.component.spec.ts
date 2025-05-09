import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveencashmentComponent } from './leaveencashment.component';

describe('LeaveencashmentComponent', () => {
  let component: LeaveencashmentComponent;
  let fixture: ComponentFixture<LeaveencashmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveencashmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveencashmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
