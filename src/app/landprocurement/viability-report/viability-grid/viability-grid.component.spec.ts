import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilityGridComponent } from './viability-grid.component';

describe('ViabilityGridComponent', () => {
  let component: ViabilityGridComponent;
  let fixture: ComponentFixture<ViabilityGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViabilityGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
