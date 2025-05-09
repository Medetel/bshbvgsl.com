import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllotedRefundComponent } from './not-alloted-refund.component';

describe('NotAllotedRefundComponent', () => {
  let component: NotAllotedRefundComponent;
  let fixture: ComponentFixture<NotAllotedRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAllotedRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAllotedRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
