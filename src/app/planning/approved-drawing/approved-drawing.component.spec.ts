import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDrawingComponent } from './approved-drawing.component';

describe('ApprovedDrawingComponent', () => {
  let component: ApprovedDrawingComponent;
  let fixture: ComponentFixture<ApprovedDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
