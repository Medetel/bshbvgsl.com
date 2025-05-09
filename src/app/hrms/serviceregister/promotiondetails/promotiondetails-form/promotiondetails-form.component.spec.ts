import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiondetailsFormComponent } from './promotiondetails-form.component';

describe('PromotiondetailsFormComponent', () => {
  let component: PromotiondetailsFormComponent;
  let fixture: ComponentFixture<PromotiondetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotiondetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotiondetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
