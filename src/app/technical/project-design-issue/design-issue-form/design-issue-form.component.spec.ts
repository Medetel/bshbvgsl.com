import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignIssueFormComponent } from './design-issue-form.component';

describe('DesignIssueFormComponent', () => {
  let component: DesignIssueFormComponent;
  let fixture: ComponentFixture<DesignIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
