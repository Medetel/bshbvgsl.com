import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanddetailsFormComponent } from './landdetails-form.component';

describe('LanddetailsFormComponent', () => {
  let component: LanddetailsFormComponent;
  let fixture: ComponentFixture<LanddetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanddetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanddetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
