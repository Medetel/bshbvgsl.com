import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDesignIssueAllGridComponent } from './project-design-issue-all-grid.component';

describe('ProjectDesignIssueAllGridComponent', () => {
  let component: ProjectDesignIssueAllGridComponent;
  let fixture: ComponentFixture<ProjectDesignIssueAllGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDesignIssueAllGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDesignIssueAllGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
