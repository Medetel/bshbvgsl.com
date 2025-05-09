import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaybillsFormComponent } from './bill-paybills-form.component';

describe('BillPaybillsFormComponent', () => {
  let component: BillPaybillsFormComponent;
  let fixture: ComponentFixture<BillPaybillsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPaybillsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaybillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
