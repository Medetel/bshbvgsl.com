import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceVerificationGridComponent } from './police-verification-grid.component';

describe('PoliceVerificationGridComponent', () => {
  let component: PoliceVerificationGridComponent;
  let fixture: ComponentFixture<PoliceVerificationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceVerificationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceVerificationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
