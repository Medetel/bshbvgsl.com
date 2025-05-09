import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemasterGridComponent } from './filemaster-grid.component';

describe('FilemasterGridComponent', () => {
  let component: FilemasterGridComponent;
  let fixture: ComponentFixture<FilemasterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemasterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
