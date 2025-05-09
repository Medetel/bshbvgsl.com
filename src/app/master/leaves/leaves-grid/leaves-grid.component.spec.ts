import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesGridComponent } from './leaves-grid.component';

describe('LeavesGridComponent', () => {
  let component: LeavesGridComponent;
  let fixture: ComponentFixture<LeavesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
