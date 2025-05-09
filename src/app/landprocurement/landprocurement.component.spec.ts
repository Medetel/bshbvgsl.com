import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandprocurementComponent } from './landprocurement.component';

describe('LandprocurementComponent', () => {
  let component: LandprocurementComponent;
  let fixture: ComponentFixture<LandprocurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandprocurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandprocurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
