import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGridComponent } from './on-grid.component';

describe('OnGridComponent', () => {
  let component: OnGridComponent;
  let fixture: ComponentFixture<OnGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
