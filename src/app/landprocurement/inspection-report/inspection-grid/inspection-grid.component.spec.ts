import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionGridComponent } from './inspection-grid.component';

describe('InspectionGridComponent', () => {
  let component: InspectionGridComponent;
  let fixture: ComponentFixture<InspectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
