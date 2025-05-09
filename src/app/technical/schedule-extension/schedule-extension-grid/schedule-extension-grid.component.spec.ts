import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExtensionGridComponent } from './schedule-extension-grid.component';

describe('ScheduleExtensionGridComponent', () => {
  let component: ScheduleExtensionGridComponent;
  let fixture: ComponentFixture<ScheduleExtensionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleExtensionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExtensionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
