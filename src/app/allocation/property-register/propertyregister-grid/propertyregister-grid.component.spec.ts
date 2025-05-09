import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyregisterGridComponent } from './propertyregister-grid.component';

describe('PropertyregisterGridComponent', () => {
  let component: PropertyregisterGridComponent;
  let fixture: ComponentFixture<PropertyregisterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyregisterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyregisterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
