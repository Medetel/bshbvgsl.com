import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllotedRefundFormComponent } from './not-alloted-refund-form.component';

describe('NotAllotedRefundFormComponent', () => {
  let component: NotAllotedRefundFormComponent;
  let fixture: ComponentFixture<NotAllotedRefundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAllotedRefundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAllotedRefundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
