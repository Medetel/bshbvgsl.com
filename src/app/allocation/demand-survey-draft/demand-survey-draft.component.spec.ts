import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandSurveyDraftComponent } from './demand-survey-draft.component';

describe('DemandSurveyDraftComponent', () => {
  let component: DemandSurveyDraftComponent;
  let fixture: ComponentFixture<DemandSurveyDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandSurveyDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandSurveyDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
