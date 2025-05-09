import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalExamDetailsFormComponent } from './departmental-exam-details-form.component';

describe('DepartmentalExamDetailsFormComponent', () => {
  let component: DepartmentalExamDetailsFormComponent;
  let fixture: ComponentFixture<DepartmentalExamDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalExamDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalExamDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
