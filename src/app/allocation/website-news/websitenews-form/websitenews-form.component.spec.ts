import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitenewsFormComponent } from './websitenews-form.component';

describe('WebsitenewsFormComponent', () => {
  let component: WebsitenewsFormComponent;
  let fixture: ComponentFixture<WebsitenewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitenewsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitenewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
