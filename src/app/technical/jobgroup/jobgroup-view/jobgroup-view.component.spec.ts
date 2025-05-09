import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobgroupViewComponent } from './jobgroup-view.component';

describe('JobgroupViewComponent', () => {
  let component: JobgroupViewComponent;
  let fixture: ComponentFixture<JobgroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobgroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobgroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
