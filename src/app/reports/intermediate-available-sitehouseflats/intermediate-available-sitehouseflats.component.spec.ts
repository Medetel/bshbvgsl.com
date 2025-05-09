import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateAvailableSitehouseflatsComponent } from './intermediate-available-sitehouseflats.component';

describe('IntermediateAvailableSitehouseflatsComponent', () => {
  let component: IntermediateAvailableSitehouseflatsComponent;
  let fixture: ComponentFixture<IntermediateAvailableSitehouseflatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateAvailableSitehouseflatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateAvailableSitehouseflatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
