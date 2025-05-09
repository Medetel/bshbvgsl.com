import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementdetailsGridComponent } from './incrementdetails-grid.component';

describe('IncrementdetailsGridComponent', () => {
  let component: IncrementdetailsGridComponent;
  let fixture: ComponentFixture<IncrementdetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementdetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementdetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
