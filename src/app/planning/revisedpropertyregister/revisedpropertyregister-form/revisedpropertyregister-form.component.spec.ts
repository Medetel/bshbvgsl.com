import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedpropertyregisterFormComponent } from './revisedpropertyregister-form.component';

describe('RevisedpropertyregisterFormComponent', () => {
  let component: RevisedpropertyregisterFormComponent;
  let fixture: ComponentFixture<RevisedpropertyregisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedpropertyregisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedpropertyregisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
