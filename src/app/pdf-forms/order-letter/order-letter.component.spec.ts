import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLetterComponent } from './order-letter.component';

describe('OrderLetterComponent', () => {
  let component: OrderLetterComponent;
  let fixture: ComponentFixture<OrderLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
