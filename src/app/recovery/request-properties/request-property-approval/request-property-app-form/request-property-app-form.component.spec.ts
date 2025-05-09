import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPropertyAppFormComponent } from './request-property-app-form.component';

describe('RequestPropertyAppFormComponent', () => {
  let component: RequestPropertyAppFormComponent;
  let fixture: ComponentFixture<RequestPropertyAppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPropertyAppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPropertyAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
