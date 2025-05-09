import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbDrawingGridComponent } from './khb-drawing-grid.component';

describe('KhbDrawingGridComponent', () => {
  let component: KhbDrawingGridComponent;
  let fixture: ComponentFixture<KhbDrawingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbDrawingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbDrawingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
