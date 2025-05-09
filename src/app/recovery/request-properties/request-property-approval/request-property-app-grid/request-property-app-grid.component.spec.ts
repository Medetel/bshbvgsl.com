import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPropertyAppGridComponent } from './request-property-app-grid.component';

describe('RequestPropertyAppGridComponent', () => {
  let component: RequestPropertyAppGridComponent;
  let fixture: ComponentFixture<RequestPropertyAppGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPropertyAppGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPropertyAppGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
