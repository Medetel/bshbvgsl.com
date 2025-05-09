import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryApplicantViewComponent } from './lottery-applicant-view.component';

describe('LotteryApplicantViewComponent', () => {
  let component: LotteryApplicantViewComponent;
  let fixture: ComponentFixture<LotteryApplicantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryApplicantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryApplicantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
