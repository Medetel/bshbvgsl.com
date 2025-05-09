import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdNotificationDraftComponent } from './id-notification-draft.component';

describe('IdNotificationDraftComponent', () => {
  let component: IdNotificationDraftComponent;
  let fixture: ComponentFixture<IdNotificationDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdNotificationDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdNotificationDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
