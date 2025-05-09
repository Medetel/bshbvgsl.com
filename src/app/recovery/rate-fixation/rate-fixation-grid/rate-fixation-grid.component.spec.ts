import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFixationGridComponent } from './rate-fixation-grid.component';

describe('RateFixationGridComponent', () => {
  let component: RateFixationGridComponent;
  let fixture: ComponentFixture<RateFixationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateFixationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFixationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
