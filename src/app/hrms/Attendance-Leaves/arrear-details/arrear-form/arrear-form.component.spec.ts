import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrearFormComponent } from './arrear-form.component';

describe('ArrearFormComponent', () => {
  let component: ArrearFormComponent;
  let fixture: ComponentFixture<ArrearFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrearFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
