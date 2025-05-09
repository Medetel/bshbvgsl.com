import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptenquirydetailsGridComponent } from './deptenquirydetails-grid.component';

describe('DeptenquirydetailsGridComponent', () => {
  let component: DeptenquirydetailsGridComponent;
  let fixture: ComponentFixture<DeptenquirydetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptenquirydetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptenquirydetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
