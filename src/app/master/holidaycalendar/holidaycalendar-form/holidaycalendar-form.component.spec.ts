import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaycalendarFormComponent } from './holidaycalendar-form.component';

describe('HolidaycalendarFormComponent', () => {
  let component: HolidaycalendarFormComponent;
  let fixture: ComponentFixture<HolidaycalendarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaycalendarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaycalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
