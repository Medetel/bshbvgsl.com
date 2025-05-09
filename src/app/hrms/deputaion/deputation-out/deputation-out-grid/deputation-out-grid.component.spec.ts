import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationOutGridComponent } from './deputation-out-grid.component';

describe('DeputationOutGridComponent', () => {
  let component: DeputationOutGridComponent;
  let fixture: ComponentFixture<DeputationOutGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationOutGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationOutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
