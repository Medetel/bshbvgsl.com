import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBasicDetailGridComponent } from './emp-basic-detail-grid.component';

describe('EmpBasicDetailGridComponent', () => {
  let component: EmpBasicDetailGridComponent;
  let fixture: ComponentFixture<EmpBasicDetailGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpBasicDetailGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBasicDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
