import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcTypeFormComponent } from './qc-type-form.component';

describe('QcTypeFormComponent', () => {
  let component: QcTypeFormComponent;
  let fixture: ComponentFixture<QcTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
