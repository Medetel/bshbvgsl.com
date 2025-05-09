import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLeaveAttenGridComponent } from './monthly-leave-atten-grid.component';

describe('MonthlyLeaveAttenGridComponent', () => {
  let component: MonthlyLeaveAttenGridComponent;
  let fixture: ComponentFixture<MonthlyLeaveAttenGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyLeaveAttenGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyLeaveAttenGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
