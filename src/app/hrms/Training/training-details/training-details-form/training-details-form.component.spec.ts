import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDetailsFormComponent } from './training-details-form.component';

describe('TrainingDetailsFormComponent', () => {
  let component: TrainingDetailsFormComponent;
  let fixture: ComponentFixture<TrainingDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
