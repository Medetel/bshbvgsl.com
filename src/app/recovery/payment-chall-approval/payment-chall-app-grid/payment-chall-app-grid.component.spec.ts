import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChallAppGridComponent } from './payment-chall-app-grid.component';

describe('PaymentChallAppGridComponent', () => {
  let component: PaymentChallAppGridComponent;
  let fixture: ComponentFixture<PaymentChallAppGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentChallAppGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChallAppGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
