import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantApplicationFormComponent } from './applicant-application-form.component';

describe('ApplicantApplicationFormComponent', () => {
  let component: ApplicantApplicationFormComponent;
  let fixture: ComponentFixture<ApplicantApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
