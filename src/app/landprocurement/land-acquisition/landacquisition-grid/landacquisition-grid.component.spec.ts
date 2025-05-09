import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandacquisitionGridComponent } from './landacquisition-grid.component';

describe('LandacquisitionGridComponent', () => {
  let component: LandacquisitionGridComponent;
  let fixture: ComponentFixture<LandacquisitionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandacquisitionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandacquisitionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
