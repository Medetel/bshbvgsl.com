import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingGridComponent } from './building-grid.component';

describe('BuildingGridComponent', () => {
  let component: BuildingGridComponent;
  let fixture: ComponentFixture<BuildingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
