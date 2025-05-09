import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedDrawingGridComponent } from './revised-drawing-grid.component';

describe('RevisedDrawingGridComponent', () => {
  let component: RevisedDrawingGridComponent;
  let fixture: ComponentFixture<RevisedDrawingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedDrawingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedDrawingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
