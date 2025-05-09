import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryClearancesFormComponent } from './statutory-clearances-form.component';

describe('StatutoryClearancesFormComponent', () => {
  let component: StatutoryClearancesFormComponent;
  let fixture: ComponentFixture<StatutoryClearancesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryClearancesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryClearancesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
