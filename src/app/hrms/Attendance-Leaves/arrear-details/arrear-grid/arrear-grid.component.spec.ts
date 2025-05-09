import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrearGridComponent } from './arrear-grid.component';

describe('ArrearGridComponent', () => {
  let component: ArrearGridComponent;
  let fixture: ComponentFixture<ArrearGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrearGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
