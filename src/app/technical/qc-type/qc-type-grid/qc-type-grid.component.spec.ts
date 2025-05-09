import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcTypeGridComponent } from './qc-type-grid.component';

describe('QcTypeGridComponent', () => {
  let component: QcTypeGridComponent;
  let fixture: ComponentFixture<QcTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
