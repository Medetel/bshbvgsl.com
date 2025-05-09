import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKhataComponent } from './e-khata.component';

describe('EKhataComponent', () => {
  let component: EKhataComponent;
  let fixture: ComponentFixture<EKhataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKhataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKhataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
