import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsAppComponent } from './agreements-app.component';

describe('AgreementsAppComponent', () => {
  let component: AgreementsAppComponent;
  let fixture: ComponentFixture<AgreementsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
