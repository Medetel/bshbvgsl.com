import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsurveyGridComponent } from './demandsurvey-grid.component';

describe('DemandsurveyGridComponent', () => {
  let component: DemandsurveyGridComponent;
  let fixture: ComponentFixture<DemandsurveyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsurveyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsurveyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
