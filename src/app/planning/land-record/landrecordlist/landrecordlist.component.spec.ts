import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandrecordlistComponent } from './landrecordlist.component';

describe('LandrecordlistComponent', () => {
  let component: LandrecordlistComponent;
  let fixture: ComponentFixture<LandrecordlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandrecordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandrecordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
