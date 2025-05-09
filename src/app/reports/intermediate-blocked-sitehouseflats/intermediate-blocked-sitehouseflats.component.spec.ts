import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateBlockedSitehouseflatsComponent } from './intermediate-blocked-sitehouseflats.component';

describe('IntermediateBlockedSitehouseflatsComponent', () => {
  let component: IntermediateBlockedSitehouseflatsComponent;
  let fixture: ComponentFixture<IntermediateBlockedSitehouseflatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateBlockedSitehouseflatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateBlockedSitehouseflatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
