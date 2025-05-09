import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaymentsFormComponent } from './bill-payments-form.component';

describe('BillPaymentsFormComponent', () => {
  let component: BillPaymentsFormComponent;
  let fixture: ComponentFixture<BillPaymentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPaymentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaymentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
