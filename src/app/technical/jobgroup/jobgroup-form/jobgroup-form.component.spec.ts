import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobgroupFormComponent } from './jobgroup-form.component';

describe('JobgroupFormComponent', () => {
  let component: JobgroupFormComponent;
  let fixture: ComponentFixture<JobgroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobgroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobgroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
