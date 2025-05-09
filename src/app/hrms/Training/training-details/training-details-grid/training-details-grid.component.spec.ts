import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDetailsGridComponent } from './training-details-grid.component';

describe('TrainingDetailsGridComponent', () => {
  let component: TrainingDetailsGridComponent;
  let fixture: ComponentFixture<TrainingDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
