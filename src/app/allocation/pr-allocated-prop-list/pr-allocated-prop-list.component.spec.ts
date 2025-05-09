import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAllocatedPropListComponent } from './pr-allocated-prop-list.component';

describe('PrAllocatedPropListComponent', () => {
  let component: PrAllocatedPropListComponent;
  let fixture: ComponentFixture<PrAllocatedPropListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrAllocatedPropListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrAllocatedPropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
