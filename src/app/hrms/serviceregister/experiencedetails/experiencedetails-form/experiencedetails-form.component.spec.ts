import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencedetailsFormComponent } from './experiencedetails-form.component';

describe('ExperiencedetailsFormComponent', () => {
  let component: ExperiencedetailsFormComponent;
  let fixture: ComponentFixture<ExperiencedetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencedetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencedetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
