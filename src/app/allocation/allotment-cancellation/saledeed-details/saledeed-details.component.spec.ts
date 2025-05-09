import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledeedDetailsComponent } from './saledeed-details.component';

describe('SaledeedDetailsComponent', () => {
  let component: SaledeedDetailsComponent;
  let fixture: ComponentFixture<SaledeedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledeedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
