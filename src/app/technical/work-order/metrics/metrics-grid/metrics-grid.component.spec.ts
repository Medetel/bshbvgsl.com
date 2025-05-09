import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsGridComponent } from './metrics-grid.component';

describe('MetricsGridComponent', () => {
  let component: MetricsGridComponent;
  let fixture: ComponentFixture<MetricsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
