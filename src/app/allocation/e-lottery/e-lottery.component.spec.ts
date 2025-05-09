import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELotteryComponent } from './e-lottery.component';

describe('ELotteryComponent', () => {
  let component: ELotteryComponent;
  let fixture: ComponentFixture<ELotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
