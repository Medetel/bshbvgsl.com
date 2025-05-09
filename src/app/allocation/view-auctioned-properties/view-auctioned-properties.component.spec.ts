import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuctionedPpropertiesComponent } from './view-auctioned-properties.component';

describe('ViewAuctionedPpropertiesComponent', () => {
  let component: ViewAuctionedPpropertiesComponent;
  let fixture: ComponentFixture<ViewAuctionedPpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAuctionedPpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuctionedPpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
