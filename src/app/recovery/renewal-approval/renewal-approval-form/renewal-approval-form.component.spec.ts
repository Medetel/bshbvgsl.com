import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalApprovalFormComponent } from './renewal-approval-form.component';

describe('RenewalApprovalFormComponent', () => {
  let component: RenewalApprovalFormComponent;
  let fixture: ComponentFixture<RenewalApprovalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalApprovalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
