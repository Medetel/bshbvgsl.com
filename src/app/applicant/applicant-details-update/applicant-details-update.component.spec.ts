import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDetailsUpdateComponent } from './applicant-details-update.component';

describe('ApplicantDetailsUpdateComponent', () => {
  let component: ApplicantDetailsUpdateComponent;
  let fixture: ComponentFixture<ApplicantDetailsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantDetailsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
