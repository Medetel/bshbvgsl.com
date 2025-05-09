import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfigViewComponent } from './payment-config-view.component';

describe('PaymentConfigViewComponent', () => {
  let component: PaymentConfigViewComponent;
  let fixture: ComponentFixture<PaymentConfigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentConfigViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
