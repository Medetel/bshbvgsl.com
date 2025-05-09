import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalGridComponent } from './approval-grid.component';

describe('ApprovalGridComponent', () => {
  let component: ApprovalGridComponent;
  let fixture: ComponentFixture<ApprovalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
