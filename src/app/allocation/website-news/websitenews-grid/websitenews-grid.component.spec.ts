import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitenewsGridComponent } from './websitenews-grid.component';

describe('WebsitenewsGridComponent', () => {
  let component: WebsitenewsGridComponent;
  let fixture: ComponentFixture<WebsitenewsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitenewsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitenewsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
