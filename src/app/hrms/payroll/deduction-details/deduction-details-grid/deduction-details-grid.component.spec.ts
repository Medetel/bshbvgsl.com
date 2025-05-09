import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailsGridComponent } from './deduction-details-grid.component';

describe('DeductionDetailsGridComponent', () => {
  let component: DeductionDetailsGridComponent;
  let fixture: ComponentFixture<DeductionDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
