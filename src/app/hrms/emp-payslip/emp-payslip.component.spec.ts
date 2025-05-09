import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpPayslipComponent } from './emp-payslip.component';
describe('EmpPayslipComponent', () => {
  let component: EmpPayslipComponent;
  let fixture: ComponentFixture<EmpPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
