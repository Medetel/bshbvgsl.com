import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationinstallmentpayComponent } from './applicationinstallmentpay.component';

describe('ApplicationinstallmentpayComponent', () => {
  let component: ApplicationinstallmentpayComponent;
  let fixture: ComponentFixture<ApplicationinstallmentpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationinstallmentpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationinstallmentpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
