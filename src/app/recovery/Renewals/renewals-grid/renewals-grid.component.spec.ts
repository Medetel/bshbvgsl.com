import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalsGridComponent } from './renewals-grid.component';

describe('RenewalsGridComponent', () => {
  let component: RenewalsGridComponent;
  let fixture: ComponentFixture<RenewalsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
