import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculationRevenueComponent } from './calculation-revenue.component';

describe('ServiceregisterComponent', () => {
  let component: CalculationRevenueComponent;
  let fixture: ComponentFixture<CalculationRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculationRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
