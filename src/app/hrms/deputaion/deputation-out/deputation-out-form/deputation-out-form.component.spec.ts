import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationOutFormComponent } from './deputation-out-form.component';

describe('DeputationOutFormComponent', () => {
  let component: DeputationOutFormComponent;
  let fixture: ComponentFixture<DeputationOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationOutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
