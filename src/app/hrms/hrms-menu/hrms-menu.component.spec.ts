import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsMenuComponent } from './hrms-menu.component';

describe('HrmsMenuComponent', () => {
  let component: HrmsMenuComponent;
  let fixture: ComponentFixture<HrmsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
