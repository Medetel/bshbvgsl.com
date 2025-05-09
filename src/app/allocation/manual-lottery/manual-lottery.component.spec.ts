import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLotteryComponent } from './manual-lottery.component';

describe('ManualLotteryComponent', () => {
  let component: ManualLotteryComponent;
  let fixture: ComponentFixture<ManualLotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
