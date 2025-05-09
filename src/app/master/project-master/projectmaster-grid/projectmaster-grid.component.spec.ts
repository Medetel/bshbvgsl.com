import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmasterGridComponent } from './projectmaster-grid.component';

describe('ProjectmasterGridComponent', () => {
  let component: ProjectmasterGridComponent;
  let fixture: ComponentFixture<ProjectmasterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectmasterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
