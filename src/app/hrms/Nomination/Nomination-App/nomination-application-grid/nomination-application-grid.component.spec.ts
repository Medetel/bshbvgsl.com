import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationApplicationGridComponent } from './nomination-application-grid.component';

describe('NominationApplicationGridComponent', () => {
  let component: NominationApplicationGridComponent;
  let fixture: ComponentFixture<NominationApplicationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationApplicationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationApplicationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
