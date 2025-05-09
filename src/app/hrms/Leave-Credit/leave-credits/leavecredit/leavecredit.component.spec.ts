import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavecreditComponent } from './leavecredit.component';

describe('LeavecreditComponent', () => {
  let component: LeavecreditComponent;
  let fixture: ComponentFixture<LeavecreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavecreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavecreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
