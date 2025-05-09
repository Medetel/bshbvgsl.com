import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltDrawingFormComponent } from './built-drawing-form.component';

describe('BuiltDrawingFormComponent', () => {
  let component: BuiltDrawingFormComponent;
  let fixture: ComponentFixture<BuiltDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
