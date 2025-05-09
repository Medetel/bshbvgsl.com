import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumGridComponent } from './quantum-grid.component';

describe('QuantumGridComponent', () => {
  let component: QuantumGridComponent;
  let fixture: ComponentFixture<QuantumGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantumGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantumGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
