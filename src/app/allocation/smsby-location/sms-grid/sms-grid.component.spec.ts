import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsGridComponent } from './sms-grid.component';

describe('SmsGridComponent', () => {
  let component: SmsGridComponent;
  let fixture: ComponentFixture<SmsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
