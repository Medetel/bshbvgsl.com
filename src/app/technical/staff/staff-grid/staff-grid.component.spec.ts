import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGridComponent } from './staff-grid.component';

describe('StaffGridComponent', () => {
  let component: StaffGridComponent;
  let fixture: ComponentFixture<StaffGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
