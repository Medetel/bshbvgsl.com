import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressGridComponent } from './project-progress-grid.component';

describe('ProjectProgressGridComponent', () => {
  let component: ProjectProgressGridComponent;
  let fixture: ComponentFixture<ProjectProgressGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProgressGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
