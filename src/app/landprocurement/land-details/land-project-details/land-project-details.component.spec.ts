import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandProjectDetailsComponent } from './land-project-details.component';

describe('LandProjectDetailsComponent', () => {
  let component: LandProjectDetailsComponent;
  let fixture: ComponentFixture<LandProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
