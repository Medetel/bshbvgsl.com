import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNamesComponent } from './project-names.component';

describe('ProjectNamesComponent', () => {
  let component: ProjectNamesComponent;
  let fixture: ComponentFixture<ProjectNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
