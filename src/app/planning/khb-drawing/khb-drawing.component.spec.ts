import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbDrawingComponent } from './khb-drawing.component';

describe('KhbDrawingComponent', () => {
  let component: KhbDrawingComponent;
  let fixture: ComponentFixture<KhbDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
