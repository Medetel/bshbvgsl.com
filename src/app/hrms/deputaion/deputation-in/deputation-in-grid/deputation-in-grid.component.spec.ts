import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationInGridComponent } from './deputation-in-grid.component';

describe('DeputationInGridComponent', () => {
  let component: DeputationInGridComponent;
  let fixture: ComponentFixture<DeputationInGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationInGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationInGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
