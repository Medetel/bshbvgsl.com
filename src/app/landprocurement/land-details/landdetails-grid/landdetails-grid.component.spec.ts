import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanddetailsGridComponent } from './landdetails-grid.component';

describe('LanddetailsGridComponent', () => {
  let component: LanddetailsGridComponent;
  let fixture: ComponentFixture<LanddetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanddetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanddetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
