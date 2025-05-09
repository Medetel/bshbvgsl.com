import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignIssueGridComponent } from './design-issue-grid.component';

describe('DesignIssueGridComponent', () => {
  let component: DesignIssueGridComponent;
  let fixture: ComponentFixture<DesignIssueGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignIssueGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignIssueGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
