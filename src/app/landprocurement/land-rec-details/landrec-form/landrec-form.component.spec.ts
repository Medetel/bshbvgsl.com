import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandrecFormComponent } from './landrec-form.component';

describe('LandrecFormComponent', () => {
  let component: LandrecFormComponent;
  let fixture: ComponentFixture<LandrecFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandrecFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandrecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
