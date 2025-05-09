import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedDrawingFormComponent } from './revised-drawing-form.component';

describe('RevisedDrawingFormComponent', () => {
  let component: RevisedDrawingFormComponent;
  let fixture: ComponentFixture<RevisedDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
