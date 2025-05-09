import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowancesDetailsGridComponent } from './allowances-details-grid.component';

describe('AllowancesDetailsGridComponent', () => {
  let component: AllowancesDetailsGridComponent;
  let fixture: ComponentFixture<AllowancesDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowancesDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowancesDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
