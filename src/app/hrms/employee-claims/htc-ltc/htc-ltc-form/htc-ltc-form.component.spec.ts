import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtcLtcFormComponent } from './htc-ltc-form.component';

describe('HtcLtcFormComponent', () => {
  let component: HtcLtcFormComponent;
  let fixture: ComponentFixture<HtcLtcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtcLtcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtcLtcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
