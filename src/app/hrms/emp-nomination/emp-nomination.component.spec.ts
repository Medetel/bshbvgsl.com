import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpNominationComponent } from './emp-nomination.component';
describe('EmpNominationComponent', () => {
  let component: EmpNominationComponent;
  let fixture: ComponentFixture<EmpNominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpNominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
