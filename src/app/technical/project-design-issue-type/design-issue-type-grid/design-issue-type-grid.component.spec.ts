import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignIssueTypeGridComponent } from './design-issue-type-grid.component';

describe('DesignIssueTypeGridComponent', () => {
  let component: DesignIssueTypeGridComponent;
  let fixture: ComponentFixture<DesignIssueTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignIssueTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignIssueTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
