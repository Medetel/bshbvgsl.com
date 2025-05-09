import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAllotmentComponent } from './re-allotment.component';

describe('ReAllotmentComponent', () => {
  let component: ReAllotmentComponent;
  let fixture: ComponentFixture<ReAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
