import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiondetailsGridComponent } from './promotiondetails-grid.component';

describe('PromotiondetailsGridComponent', () => {
  let component: PromotiondetailsGridComponent;
  let fixture: ComponentFixture<PromotiondetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotiondetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotiondetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
