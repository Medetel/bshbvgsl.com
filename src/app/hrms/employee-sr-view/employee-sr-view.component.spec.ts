import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSrViewComponent } from './employee-sr-view.component';

describe('EmployeeSrViewComponent', () => {
  let component: EmployeeSrViewComponent;
  let fixture: ComponentFixture<EmployeeSrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
