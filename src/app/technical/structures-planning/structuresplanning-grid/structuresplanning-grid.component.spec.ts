import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresplanningGridComponent } from './structuresplanning-grid.component';

describe('StructuresplanningGridComponent', () => {
  let component: StructuresplanningGridComponent;
  let fixture: ComponentFixture<StructuresplanningGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresplanningGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresplanningGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
