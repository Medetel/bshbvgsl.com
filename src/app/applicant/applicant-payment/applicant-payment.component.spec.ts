import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPaymentComponent } from './applicant-payment.component';

describe('ApplicantPaymentComponent', () => {
  let component: ApplicantPaymentComponent;
  let fixture: ComponentFixture<ApplicantPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
