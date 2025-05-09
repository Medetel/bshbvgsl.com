import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaycalendarGridComponent } from './holidaycalendar-grid.component';

describe('HolidaycalendarGridComponent', () => {
  let component: HolidaycalendarGridComponent;
  let fixture: ComponentFixture<HolidaycalendarGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaycalendarGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaycalendarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
