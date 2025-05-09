import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledeedComponent } from './saledeed.component';

describe('SaledeedComponent', () => {
  let component: SaledeedComponent;
  let fixture: ComponentFixture<SaledeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
