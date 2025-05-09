import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationInFormComponent } from './deputation-in-form.component';

describe('DeputationInFormComponent', () => {
  let component: DeputationInFormComponent;
  let fixture: ComponentFixture<DeputationInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
