import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantMenuComponent } from './applicant-menu.component';

describe('ApplicantMenuComponent', () => {
  let component: ApplicantMenuComponent;
  let fixture: ComponentFixture<ApplicantMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
