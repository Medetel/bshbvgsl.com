import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPropertiesComponent } from './request-properties.component';

describe('RequestPropertiesComponent', () => {
  let component: RequestPropertiesComponent;
  let fixture: ComponentFixture<RequestPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
