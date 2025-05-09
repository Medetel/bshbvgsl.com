import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderViewComponent } from './bidder-view.component';

describe('BidderViewComponent', () => {
  let component: BidderViewComponent;
  let fixture: ComponentFixture<BidderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
