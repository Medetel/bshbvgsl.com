import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpChangeAddressComponent } from './emp-change-address.component';
describe('EmpChangeAddressComponent', () => {
  let component: EmpChangeAddressComponent;
  let fixture: ComponentFixture<EmpChangeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpChangeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpChangeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
