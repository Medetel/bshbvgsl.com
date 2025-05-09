import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedpropertyregisterGridComponent } from './revisedpropertyregister-grid.component';

describe('RevisedpropertyregisterGridComponent', () => {
  let component: RevisedpropertyregisterGridComponent;
  let fixture: ComponentFixture<RevisedpropertyregisterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedpropertyregisterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedpropertyregisterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
