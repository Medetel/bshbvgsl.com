import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptAppGirdComponent } from './payment-receipt-app-gird.component';

describe('PaymentReceiptAppGirdComponent', () => {
  let component: PaymentReceiptAppGirdComponent;
  let fixture: ComponentFixture<PaymentReceiptAppGirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiptAppGirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptAppGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
