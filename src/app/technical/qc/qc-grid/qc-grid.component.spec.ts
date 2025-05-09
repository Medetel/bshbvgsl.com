import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcGridComponent } from './qc-grid.component';

describe('QcGridComponent', () => {
  let component: QcGridComponent;
  let fixture: ComponentFixture<QcGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
