import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertGridComponent } from './workflow-alert-grid.component';

describe('WorkflowAlertGridComponent', () => {
  let component: WorkflowAlertGridComponent;
  let fixture: ComponentFixture<WorkflowAlertGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowAlertGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
