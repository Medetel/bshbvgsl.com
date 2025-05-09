import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationReportsComponent } from './cancellation-reports.component';

describe('CancellationReportsComponent', () => {
  let component: CancellationReportsComponent;
  let fixture: ComponentFixture<CancellationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
