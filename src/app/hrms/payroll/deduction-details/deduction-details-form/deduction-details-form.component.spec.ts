import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailsFormComponent } from './deduction-details-form.component';

describe('DeductionDetailsFormComponent', () => {
  let component: DeductionDetailsFormComponent;
  let fixture: ComponentFixture<DeductionDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
