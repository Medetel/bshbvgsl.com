import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationReportsComponent } from './allocation-reports.component';

describe('AllocationReportsComponent', () => {
  let component: AllocationReportsComponent;
  let fixture: ComponentFixture<AllocationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
