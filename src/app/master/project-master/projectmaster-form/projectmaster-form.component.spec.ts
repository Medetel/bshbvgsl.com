import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmasterFormComponent } from './projectmaster-form.component';

describe('ProjectmasterFormComponent', () => {
  let component: ProjectmasterFormComponent;
  let fixture: ComponentFixture<ProjectmasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectmasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
