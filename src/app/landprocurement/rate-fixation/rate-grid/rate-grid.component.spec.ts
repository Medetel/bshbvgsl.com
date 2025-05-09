import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateGridComponent } from './rate-grid.component';

describe('RateGridComponent', () => {
  let component: RateGridComponent;
  let fixture: ComponentFixture<RateGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
