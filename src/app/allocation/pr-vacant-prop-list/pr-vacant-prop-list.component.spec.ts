import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrVacantPropListComponent } from './pr-vacant-prop-list.component';

describe('PrVacantPropListComponent', () => {
  let component: PrVacantPropListComponent;
  let fixture: ComponentFixture<PrVacantPropListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrVacantPropListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrVacantPropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
