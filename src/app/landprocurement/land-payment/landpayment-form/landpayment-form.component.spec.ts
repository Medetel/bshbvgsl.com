import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpaymentFormComponent } from './landpayment-form.component';

describe('LandpaymentFormComponent', () => {
  let component: LandpaymentFormComponent;
  let fixture: ComponentFixture<LandpaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandpaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
