import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmGridComponent } from './fm-grid.component';

describe('FmGridComponent', () => {
  let component: FmGridComponent;
  let fixture: ComponentFixture<FmGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
