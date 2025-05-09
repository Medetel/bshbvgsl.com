import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PescTypeGridComponent } from './pesc-type-grid.component';

describe('PescTypeGridComponent', () => {
  let component: PescTypeGridComponent;
  let fixture: ComponentFixture<PescTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PescTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
