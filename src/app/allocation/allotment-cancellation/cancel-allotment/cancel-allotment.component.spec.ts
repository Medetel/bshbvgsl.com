import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAllotmentComponent } from './cancel-allotment.component';

describe('CancelAllotmentComponent', () => {
  let component: CancelAllotmentComponent;
  let fixture: ComponentFixture<CancelAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
