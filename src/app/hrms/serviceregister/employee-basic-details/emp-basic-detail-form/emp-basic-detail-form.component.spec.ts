import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBasicDetailFormComponent } from './emp-basic-detail-form.component';

describe('EmpBasicDetailFormComponent', () => {
  let component: EmpBasicDetailFormComponent;
  let fixture: ComponentFixture<EmpBasicDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpBasicDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBasicDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
