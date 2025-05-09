import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRequestFormComponent } from './submitrequest-form.component';

describe('SubmitRequestFormComponent', () => {
  let component: SubmitRequestFormComponent;
  let fixture: ComponentFixture<SubmitRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
