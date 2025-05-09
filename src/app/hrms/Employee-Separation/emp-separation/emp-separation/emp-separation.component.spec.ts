import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSeparationComponent } from './emp-separation.component';

describe('EmpSeparationComponent', () => {
  let component: EmpSeparationComponent;
  let fixture: ComponentFixture<EmpSeparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSeparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSeparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
