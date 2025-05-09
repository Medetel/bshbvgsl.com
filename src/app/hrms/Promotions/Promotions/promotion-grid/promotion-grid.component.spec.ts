import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionGridComponent } from './promotion-grid.component';

describe('PromotionGridComponent', () => {
  let component: PromotionGridComponent;
  let fixture: ComponentFixture<PromotionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
