import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentconfigComponent } from './installmentconfig.component';

describe('InstallmentconfigComponent', () => {
  let component: InstallmentconfigComponent;
  let fixture: ComponentFixture<InstallmentconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
