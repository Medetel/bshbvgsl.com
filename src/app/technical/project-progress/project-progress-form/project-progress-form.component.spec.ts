import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressFormComponent } from './project-progress-form.component';

describe('ProjectProgressFormComponent', () => {
  let component: ProjectProgressFormComponent;
  let fixture: ComponentFixture<ProjectProgressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProgressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
