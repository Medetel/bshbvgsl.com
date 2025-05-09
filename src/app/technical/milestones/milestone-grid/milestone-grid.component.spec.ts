import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneGridComponent } from './milestone-grid.component';

describe('MilestoneGridComponent', () => {
  let component: MilestoneGridComponent;
  let fixture: ComponentFixture<MilestoneGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
