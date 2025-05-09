import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationInputGridComponent } from './qualification-input-grid.component';

describe('QualificationInputGridComponent', () => {
  let component: QualificationInputGridComponent;
  let fixture: ComponentFixture<QualificationInputGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationInputGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationInputGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
