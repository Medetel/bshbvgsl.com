import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGridComponent } from './salary-grid.component';

describe('SalaryGridComponent', () => {
  let component: SalaryGridComponent;
  let fixture: ComponentFixture<SalaryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
