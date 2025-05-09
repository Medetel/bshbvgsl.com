import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencedetailsGridComponent } from './experiencedetails-grid.component';

describe('ExperiencedetailsGridComponent', () => {
  let component: ExperiencedetailsGridComponent;
  let fixture: ComponentFixture<ExperiencedetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencedetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencedetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
