import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltDrawingComponent } from './built-drawing.component';

describe('BuiltDrawingComponent', () => {
  let component: BuiltDrawingComponent;
  let fixture: ComponentFixture<BuiltDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
