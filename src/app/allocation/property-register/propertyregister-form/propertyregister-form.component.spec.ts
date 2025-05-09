import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyregisterFormComponent } from './propertyregister-form.component';

describe('PropertyregisterFormComponent', () => {
  let component: PropertyregisterFormComponent;
  let fixture: ComponentFixture<PropertyregisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyregisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyregisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
