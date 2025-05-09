import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsToFinanceComponent } from './bills-to-finance.component';

describe('BillsToFinanceComponent', () => {
  let component: BillsToFinanceComponent;
  let fixture: ComponentFixture<BillsToFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsToFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsToFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
