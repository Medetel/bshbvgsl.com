import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderBillFormComponent } from './tender-bill-form.component';

describe('TenderBillFormComponent', () => {
  let component: TenderBillFormComponent;
  let fixture: ComponentFixture<TenderBillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderBillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
