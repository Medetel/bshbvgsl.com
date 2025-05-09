import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningdetailsGridComponent } from './joiningdetails-grid.component';

describe('JoiningdetailsGridComponent', () => {
  let component: JoiningdetailsGridComponent;
  let fixture: ComponentFixture<JoiningdetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningdetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningdetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
