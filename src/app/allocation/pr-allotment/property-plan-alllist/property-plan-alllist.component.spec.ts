import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPlanAlllistComponent } from './property-plan-alllist.component';

describe('PropertyPlanAlllistComponent', () => {
  let component: PropertyPlanAlllistComponent;
  let fixture: ComponentFixture<PropertyPlanAlllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPlanAlllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPlanAlllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
