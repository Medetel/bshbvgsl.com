import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentProjectListComponent } from './allotment-project-list.component';

describe('AllotmentProjectListComponent', () => {
  let component: AllotmentProjectListComponent;
  let fixture: ComponentFixture<AllotmentProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotmentProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotmentProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
