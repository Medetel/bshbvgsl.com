import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptenquirydetailsFormComponent } from './deptenquirydetails-form.component';

describe('DeptenquirydetailsFormComponent', () => {
  let component: DeptenquirydetailsFormComponent;
  let fixture: ComponentFixture<DeptenquirydetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptenquirydetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptenquirydetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
