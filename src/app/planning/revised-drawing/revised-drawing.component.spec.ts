import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedDrawingComponent } from './revised-drawing.component';

describe('RevisedDrawingComponent', () => {
  let component: RevisedDrawingComponent;
  let fixture: ComponentFixture<RevisedDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
