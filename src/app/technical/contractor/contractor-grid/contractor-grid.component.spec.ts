import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorGridComponent } from './contractor-grid.component';

describe('ContractorGridComponent', () => {
  let component: ContractorGridComponent;
  let fixture: ComponentFixture<ContractorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
