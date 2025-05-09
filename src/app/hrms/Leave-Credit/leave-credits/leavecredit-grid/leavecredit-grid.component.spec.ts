import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavecreditGridComponent } from './leavecredit-grid.component';

describe('LeavecreditGridComponent', () => {
  let component: LeavecreditGridComponent;
  let fixture: ComponentFixture<LeavecreditGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavecreditGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavecreditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
