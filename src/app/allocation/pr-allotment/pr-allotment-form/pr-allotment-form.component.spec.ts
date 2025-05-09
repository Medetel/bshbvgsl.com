import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAllotmentFormComponent } from './pr-allotment-form.component';

describe('PrAllotmentFormComponent', () => {
  let component: PrAllotmentFormComponent;
  let fixture: ComponentFixture<PrAllotmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrAllotmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrAllotmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
