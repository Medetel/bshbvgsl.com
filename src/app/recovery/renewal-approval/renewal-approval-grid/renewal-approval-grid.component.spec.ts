import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalApprovalGridComponent } from './renewal-approval-grid.component';

describe('RenewalApprovalGridComponent', () => {
  let component: RenewalApprovalGridComponent;
  let fixture: ComponentFixture<RenewalApprovalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalApprovalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalApprovalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
