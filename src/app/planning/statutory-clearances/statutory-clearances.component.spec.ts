import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryClearancesComponent } from './statutory-clearances.component';

describe('StatutoryClearancesComponent', () => {
  let component: StatutoryClearancesComponent;
  let fixture: ComponentFixture<StatutoryClearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryClearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryClearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
