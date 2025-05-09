import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionedPropertiesCancelComponent } from './auctioned-properties-cancel.component';

describe('AuctionedPropertiesCancelComponent', () => {
  let component: AuctionedPropertiesCancelComponent;
  let fixture: ComponentFixture<AuctionedPropertiesCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionedPropertiesCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionedPropertiesCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
