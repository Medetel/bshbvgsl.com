import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDrawingFormComponent } from './approved-drawing-form.component';

describe('ApprovedDrawingFormComponent', () => {
  let component: ApprovedDrawingFormComponent;
  let fixture: ComponentFixture<ApprovedDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
