import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAllotmentletterComponent } from './print-allotmentletter.component';

describe('PrintAllotmentletterComponent', () => {
  let component: PrintAllotmentletterComponent;
  let fixture: ComponentFixture<PrintAllotmentletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAllotmentletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAllotmentletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
