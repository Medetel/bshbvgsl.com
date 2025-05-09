import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationApplicationComponent } from './nomination-application.component';

describe('NominationApplicationComponent', () => {
  let component: NominationApplicationComponent;
  let fixture: ComponentFixture<NominationApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
