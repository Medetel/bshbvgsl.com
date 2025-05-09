import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbDrawingFormComponent } from './khb-drawing-form.component';

describe('KhbDrawingFormComponent', () => {
  let component: KhbDrawingFormComponent;
  let fixture: ComponentFixture<KhbDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
