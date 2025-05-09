import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantQueryComponent } from './applicant-query.component';

describe('ApplicantQueryComponent', () => {
  let component: ApplicantQueryComponent;
  let fixture: ComponentFixture<ApplicantQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
