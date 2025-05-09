import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSeparationGridComponent } from './emp-separation-grid.component';

describe('EmpSeparationGridComponent', () => {
  let component: EmpSeparationGridComponent;
  let fixture: ComponentFixture<EmpSeparationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSeparationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSeparationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
