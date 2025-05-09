import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrearSanctionGridComponent } from './arrear-sanction-grid.component';

describe('ArrearSanctionGridComponent', () => {
  let component: ArrearSanctionGridComponent;
  let fixture: ComponentFixture<ArrearSanctionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrearSanctionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearSanctionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
