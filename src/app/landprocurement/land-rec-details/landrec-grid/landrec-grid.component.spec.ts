import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandrecGridComponent } from './landrec-grid.component';

describe('LandrecGridComponent', () => {
  let component: LandrecGridComponent;
  let fixture: ComponentFixture<LandrecGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandrecGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandrecGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
