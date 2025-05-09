import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseBasePriceComponent } from './revise-base-price.component';

describe('ReviseBasePriceComponent', () => {
  let component: ReviseBasePriceComponent;
  let fixture: ComponentFixture<ReviseBasePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseBasePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseBasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
