import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRequestGridComponent } from './submitrequest-grid.component';

describe('SubmitRequestGridComponent', () => {
  let component: SubmitRequestGridComponent;
  let fixture: ComponentFixture<SubmitRequestGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRequestGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
