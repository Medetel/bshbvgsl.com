import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowancesDetailsFormComponent } from './allowances-details-form.component';

describe('AllowancesDetailsFormComponent', () => {
  let component: AllowancesDetailsFormComponent;
  let fixture: ComponentFixture<AllowancesDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowancesDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowancesDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
