import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumFormComponent } from './quantum-form.component';

describe('QuantumFormComponent', () => {
  let component: QuantumFormComponent;
  let fixture: ComponentFixture<QuantumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
