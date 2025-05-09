import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasescheduleFormComponent } from './phaseschedule-form.component';

describe('PhasescheduleFormComponent', () => {
  let component: PhasescheduleFormComponent;
  let fixture: ComponentFixture<PhasescheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasescheduleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasescheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
