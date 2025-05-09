import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncumbrancesGridComponent } from './encumbrances-grid.component';

describe('EncumbrancesGridComponent', () => {
  let component: EncumbrancesGridComponent;
  let fixture: ComponentFixture<EncumbrancesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncumbrancesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncumbrancesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
