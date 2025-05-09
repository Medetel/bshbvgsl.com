import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrearApprovalGridComponent } from './arrear-approval-grid.component';

describe('ArrearApprovalGridComponent', () => {
  let component: ArrearApprovalGridComponent;
  let fixture: ComponentFixture<ArrearApprovalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrearApprovalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearApprovalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
