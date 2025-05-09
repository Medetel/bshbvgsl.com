import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentAllottedPropertyComponent } from './allotment-allotted-property.component';

describe('AllotmentAllottedPropertyComponent', () => {
  let component: AllotmentAllottedPropertyComponent;
  let fixture: ComponentFixture<AllotmentAllottedPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotmentAllottedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotmentAllottedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
