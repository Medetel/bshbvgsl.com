import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationrefundComponent } from './applicationrefund.component';

describe('ApplicationrefundComponent', () => {
  let component: ApplicationrefundComponent;
  let fixture: ComponentFixture<ApplicationrefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationrefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationrefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
