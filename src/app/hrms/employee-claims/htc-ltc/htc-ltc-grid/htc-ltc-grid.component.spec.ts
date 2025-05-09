import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtcLtcGridComponent } from './htc-ltc-grid.component';

describe('HtcLtcGridComponent', () => {
  let component: HtcLtcGridComponent;
  let fixture: ComponentFixture<HtcLtcGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtcLtcGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtcLtcGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
