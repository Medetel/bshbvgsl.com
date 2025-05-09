import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncumbrancesTypeGridComponent } from './encumbrances-type-grid.component';

describe('EncumbrancesTypeGridComponent', () => {
  let component: EncumbrancesTypeGridComponent;
  let fixture: ComponentFixture<EncumbrancesTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncumbrancesTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncumbrancesTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
