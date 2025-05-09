import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExtensionFormComponent } from './schedule-extension-form.component';

describe('ScheduleExtensionFormComponent', () => {
  let component: ScheduleExtensionFormComponent;
  let fixture: ComponentFixture<ScheduleExtensionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleExtensionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExtensionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
