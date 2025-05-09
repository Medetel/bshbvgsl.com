import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationInputFormComponent } from './qualification-input-form.component';

describe('QualificationInputFormComponent', () => {
  let component: QualificationInputFormComponent;
  let fixture: ComponentFixture<QualificationInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
