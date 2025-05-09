import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmFormComponent } from './fm-form.component';

describe('FmFormComponent', () => {
  let component: FmFormComponent;
  let fixture: ComponentFixture<FmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
