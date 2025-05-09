import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFormComponent } from './on-form.component';

describe('OnFormComponent', () => {
  let component: OnFormComponent;
  let fixture: ComponentFixture<OnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
