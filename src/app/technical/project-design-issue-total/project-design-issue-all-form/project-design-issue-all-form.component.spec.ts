import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDesignIssueAllFormComponent } from './project-design-issue-all-form.component';

describe('ProjectDesignIssueAllFormComponent', () => {
  let component: ProjectDesignIssueAllFormComponent;
  let fixture: ComponentFixture<ProjectDesignIssueAllFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDesignIssueAllFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDesignIssueAllFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
