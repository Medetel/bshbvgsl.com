import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbnotificationComponent } from './khbnotification.component';

describe('KhbnotificationComponent', () => {
  let component: KhbnotificationComponent;
  let fixture: ComponentFixture<KhbnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
