import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLotteryTokenComponent } from './manual-lottery-token.component';

describe('ManualLotteryTokenComponent', () => {
  let component: ManualLotteryTokenComponent;
  let fixture: ComponentFixture<ManualLotteryTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLotteryTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLotteryTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
