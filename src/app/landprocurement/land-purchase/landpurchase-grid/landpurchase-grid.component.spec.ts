import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpurchaseGridComponent } from './landpurchase-grid.component';

describe('LandpurchaseGridComponent', () => {
  let component: LandpurchaseGridComponent;
  let fixture: ComponentFixture<LandpurchaseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandpurchaseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpurchaseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
