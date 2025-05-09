import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceregisterComponent } from './serviceregister.component';

describe('ServiceregisterComponent', () => {
  let component: ServiceregisterComponent;
  let fixture: ComponentFixture<ServiceregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
