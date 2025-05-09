import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptAppFormComponent } from './payment-receipt-app-form.component';

describe('PaymentReceiptAppFormComponent', () => {
  let component: PaymentReceiptAppFormComponent;
  let fixture: ComponentFixture<PaymentReceiptAppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiptAppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
