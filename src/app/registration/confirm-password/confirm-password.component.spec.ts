import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPawordComponent } from './confirm-password.component';
describe('ConfirmPawordComponent', () => {
  let component: ConfirmPawordComponent;
  let fixture: ComponentFixture<ConfirmPawordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPawordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
