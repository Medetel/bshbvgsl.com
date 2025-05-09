import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentCancellationComponent } from './allotment-cancellation.component';

describe('AllotmentCancellationComponent', () => {
  let component: AllotmentCancellationComponent;
  let fixture: ComponentFixture<AllotmentCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotmentCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotmentCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
