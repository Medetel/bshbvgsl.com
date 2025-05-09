import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpaymentGridComponent } from './landpayment-grid.component';

describe('LandpaymentGridComponent', () => {
  let component: LandpaymentGridComponent;
  let fixture: ComponentFixture<LandpaymentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandpaymentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpaymentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
