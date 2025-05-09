import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbnotificationltrComponent } from './khbnotificationltr.component';

describe('KhbnotificationComponent', () => {
  let component: KhbnotificationltrComponent;
  let fixture: ComponentFixture<KhbnotificationltrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbnotificationltrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbnotificationltrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
