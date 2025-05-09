import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueorderFormComponent } from './issueorder-form.component';

describe('IssueorderFormComponent', () => {
  let component: IssueorderFormComponent;
  let fixture: ComponentFixture<IssueorderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueorderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueorderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
