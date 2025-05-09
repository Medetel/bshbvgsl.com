import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandacquisitionFormComponent } from './landacquisition-form.component';

describe('LandacquisitionFormComponent', () => {
  let component: LandacquisitionFormComponent;
  let fixture: ComponentFixture<LandacquisitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandacquisitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandacquisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
