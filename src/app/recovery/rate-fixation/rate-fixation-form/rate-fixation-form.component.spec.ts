import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFixationFormComponent } from './rate-fixation-form.component';

describe('RateFixationFormComponent', () => {
  let component: RateFixationFormComponent;
  let fixture: ComponentFixture<RateFixationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateFixationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFixationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
