import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractordocGridComponent } from './contractordoc-grid.component';

describe('ContractordocGridComponent', () => {
  let component: ContractordocGridComponent;
  let fixture: ComponentFixture<ContractordocGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractordocGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractordocGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
