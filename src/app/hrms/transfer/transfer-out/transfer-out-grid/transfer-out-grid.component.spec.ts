import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOutGridComponent } from './transfer-out-grid.component';

describe('TransferOutGridComponent', () => {
  let component: TransferOutGridComponent;
  let fixture: ComponentFixture<TransferOutGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferOutGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
