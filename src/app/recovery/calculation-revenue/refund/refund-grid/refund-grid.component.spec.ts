import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundGridComponent } from './refund-grid.component';

describe('RefundGridComponent', () => {
  let component: RefundGridComponent;
  let fixture: ComponentFixture<RefundGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefundGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
