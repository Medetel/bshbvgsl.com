import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesregisterListComponent } from './propertiesregister-list.component';

describe('PropertiesregisterListComponent', () => {
  let component: PropertiesregisterListComponent;
  let fixture: ComponentFixture<PropertiesregisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesregisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesregisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
