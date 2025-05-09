import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandprocurementMenuComponent } from './landprocurement-menu.component';

describe('LandprocurementMenuComponent', () => {
  let component: LandprocurementMenuComponent;
  let fixture: ComponentFixture<LandprocurementMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandprocurementMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandprocurementMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
