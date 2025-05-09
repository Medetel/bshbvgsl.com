import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAllotmentNotsentComponent } from './pr-allotment-notsent.component';

describe('PrAllotmentNotsentComponent', () => {
  let component: PrAllotmentNotsentComponent;
  let fixture: ComponentFixture<PrAllotmentNotsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrAllotmentNotsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrAllotmentNotsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
