import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChallAppFormComponent } from './payment-chall-app-form.component';

describe('PaymentChallAppFormComponent', () => {
  let component: PaymentChallAppFormComponent;
  let fixture: ComponentFixture<PaymentChallAppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentChallAppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChallAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
