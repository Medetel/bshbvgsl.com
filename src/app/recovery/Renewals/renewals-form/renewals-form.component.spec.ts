import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalsFormComponent } from './renewals-form.component';

describe('RenewalsFormComponent', () => {
  let component: RenewalsFormComponent;
  let fixture: ComponentFixture<RenewalsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
