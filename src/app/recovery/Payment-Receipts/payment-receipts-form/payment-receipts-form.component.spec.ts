import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptsFormComponent } from './payment-receipts-form.component';

describe('PaymentReceiptsFormComponent', () => {
  let component: PaymentReceiptsFormComponent;
  let fixture: ComponentFixture<PaymentReceiptsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiptsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
