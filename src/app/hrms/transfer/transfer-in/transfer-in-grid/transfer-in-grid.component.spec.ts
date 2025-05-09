import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferInGridComponent } from './transfer-in-grid.component';

describe('TransferInGridComponent', () => {
  let component: TransferInGridComponent;
  let fixture: ComponentFixture<TransferInGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferInGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferInGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
