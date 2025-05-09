import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDetailsGridComponent } from './insurance-details-grid.component';

describe('InsuranceDetailsGridComponent', () => {
  let component: InsuranceDetailsGridComponent;
  let fixture: ComponentFixture<InsuranceDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
