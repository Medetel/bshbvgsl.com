import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalExamDetailsGridComponent } from './departmental-exam-details-grid.component';

describe('DepartmentalExamDetailsGridComponent', () => {
  let component: DepartmentalExamDetailsGridComponent;
  let fixture: ComponentFixture<DepartmentalExamDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalExamDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalExamDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
