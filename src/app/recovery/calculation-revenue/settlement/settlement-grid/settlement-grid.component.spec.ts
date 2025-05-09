import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementGridComponent } from './settlement-grid.component';

describe('SettlementGridComponent', () => {
  let component: SettlementGridComponent;
  let fixture: ComponentFixture<SettlementGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettlementGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
