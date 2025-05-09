import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractordocFormComponent } from './contractordoc-form.component';

describe('ContractordocFormComponent', () => {
  let component: ContractordocFormComponent;
  let fixture: ComponentFixture<ContractordocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractordocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractordocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
