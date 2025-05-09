import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChallApprovalComponent } from './payment-chall-approval.component';

describe('PaymentChallApprovalComponent', () => {
  let component: PaymentChallApprovalComponent;
  let fixture: ComponentFixture<PaymentChallApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentChallApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChallApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
