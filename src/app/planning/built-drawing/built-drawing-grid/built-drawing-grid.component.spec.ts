import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltDrawingGridComponent } from './built-drawing-grid.component';

describe('BuiltDrawingGridComponent', () => {
  let component: BuiltDrawingGridComponent;
  let fixture: ComponentFixture<BuiltDrawingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltDrawingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltDrawingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
