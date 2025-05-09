import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpBankDetailsComponent } from './emp-bank-details.component';
describe('EmpBankDetailsComponent', () => {
  let component: EmpBankDetailsComponent;
  let fixture: ComponentFixture<EmpBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
