import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesregisterComponent } from './propertiesregister.component';

describe('PropertiesregisterComponent', () => {
  let component: PropertiesregisterComponent;
  let fixture: ComponentFixture<PropertiesregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
