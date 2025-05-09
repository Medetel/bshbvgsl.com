import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDrawingGridComponent } from './approved-drawing-grid.component';

describe('ApprovedDrawingGridComponent', () => {
  let component: ApprovedDrawingGridComponent;
  let fixture: ComponentFixture<ApprovedDrawingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDrawingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDrawingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
