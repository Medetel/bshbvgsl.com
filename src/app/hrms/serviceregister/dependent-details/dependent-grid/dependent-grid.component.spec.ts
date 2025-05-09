import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentGridComponent } from './dependent-grid.component';

describe('DependentGridComponent', () => {
  let component: DependentGridComponent;
  let fixture: ComponentFixture<DependentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
