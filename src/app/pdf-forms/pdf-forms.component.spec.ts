import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFormsComponent } from './pdf-forms.component';

describe('PdfFormsComponent', () => {
  let component: PdfFormsComponent;
  let fixture: ComponentFixture<PdfFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
