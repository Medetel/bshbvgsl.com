import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesregisterFormComponent } from './propertiesregister-form.component';

describe('PropertiesregisterFormComponent', () => {
  let component: PropertiesregisterFormComponent;
  let fixture: ComponentFixture<PropertiesregisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesregisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesregisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
