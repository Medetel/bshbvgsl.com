import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentDueComponent } from './installment-due.component';

describe('InstallmentDueComponent', () => {
  let component: InstallmentDueComponent;
  let fixture: ComponentFixture<InstallmentDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
