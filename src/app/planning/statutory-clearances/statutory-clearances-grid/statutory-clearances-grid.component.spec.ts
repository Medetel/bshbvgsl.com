import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryClearancesGridComponent } from './statutory-clearances-grid.component';

describe('StatutoryClearancesGridComponent', () => {
  let component: StatutoryClearancesGridComponent;
  let fixture: ComponentFixture<StatutoryClearancesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryClearancesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryClearancesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
