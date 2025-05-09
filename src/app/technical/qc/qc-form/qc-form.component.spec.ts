import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcFormComponent } from './qc-form.component';

describe('QcFormComponent', () => {
  let component: QcFormComponent;
  let fixture: ComponentFixture<QcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
