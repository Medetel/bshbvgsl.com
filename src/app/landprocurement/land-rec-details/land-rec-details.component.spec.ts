import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandRecDetailsComponent } from './land-rec-details.component';

describe('LandRecDetailsComponent', () => {
  let component: LandRecDetailsComponent;
  let fixture: ComponentFixture<LandRecDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandRecDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandRecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
