import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkprogressFormComponent } from './workprogress-form.component';

describe('WorkprogressFormComponent', () => {
  let component: WorkprogressFormComponent;
  let fixture: ComponentFixture<WorkprogressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkprogressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkprogressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
