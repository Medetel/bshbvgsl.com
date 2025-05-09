import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignIssueTypeFormComponent } from './design-issue-type-form.component';

describe('DesignIssueTypeFormComponent', () => {
  let component: DesignIssueTypeFormComponent;
  let fixture: ComponentFixture<DesignIssueTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignIssueTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignIssueTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
