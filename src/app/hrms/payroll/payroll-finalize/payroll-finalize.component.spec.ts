import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollFinalizeComponent } from './payroll-finalize.component';

describe('PayrollFinalizeComponent', () => {
  let component: PayrollFinalizeComponent;
  let fixture: ComponentFixture<PayrollFinalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollFinalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
