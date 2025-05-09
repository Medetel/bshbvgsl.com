import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptsGridComponent } from './payment-receipts-grid.component';

describe('PaymentReceiptsGridComponent', () => {
  let component: PaymentReceiptsGridComponent;
  let fixture: ComponentFixture<PaymentReceiptsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiptsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
