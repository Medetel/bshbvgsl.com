import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkslipStatementComponent } from './workslip-statement.component';

describe('WorkslipStatementComponent', () => {
  let component: WorkslipStatementComponent;
  let fixture: ComponentFixture<WorkslipStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkslipStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkslipStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
