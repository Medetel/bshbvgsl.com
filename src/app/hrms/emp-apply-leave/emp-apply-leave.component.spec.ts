import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpApplyLeaveComponent } from './emp-apply-leave.component';
describe('EmpApplyLeaveComponent', () => {
  let component: EmpApplyLeaveComponent;
  let fixture: ComponentFixture<EmpApplyLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpApplyLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
