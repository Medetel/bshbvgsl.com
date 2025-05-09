import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAllotmentGridComponent } from './pr-allotment-grid.component';

describe('PrAllotmentGridComponent', () => {
  let component: PrAllotmentGridComponent;
  let fixture: ComponentFixture<PrAllotmentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrAllotmentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrAllotmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
