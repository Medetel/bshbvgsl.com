import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptApprovalComponent } from './payment-receipt-approval.component';

describe('PaymentReceiptApprovalComponent', () => {
  let component: PaymentReceiptApprovalComponent;
  let fixture: ComponentFixture<PaymentReceiptApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiptApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
