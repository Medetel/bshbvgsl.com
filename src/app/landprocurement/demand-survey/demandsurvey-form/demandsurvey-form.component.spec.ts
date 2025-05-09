import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsurveyFormComponent } from './demandsurvey-form.component';

describe('DemandsurveyFormComponent', () => {
  let component: DemandsurveyFormComponent;
  let fixture: ComponentFixture<DemandsurveyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsurveyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
