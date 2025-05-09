import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilityFormComponent } from './viability-form.component';

describe('ViabilityFormComponent', () => {
  let component: ViabilityFormComponent;
  let fixture: ComponentFixture<ViabilityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViabilityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
