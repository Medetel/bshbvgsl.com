import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtViewComponent } from './court-view.component';

describe('CourtViewComponent', () => {
  let component: CourtViewComponent;
  let fixture: ComponentFixture<CourtViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
