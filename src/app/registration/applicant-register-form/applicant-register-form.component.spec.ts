import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegisterFormComponent } from './applicant-register-form.component';

describe('ApplicantRegisterFormComponent', () => {
  let component: ApplicantRegisterFormComponent;
  let fixture: ComponentFixture<ApplicantRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
