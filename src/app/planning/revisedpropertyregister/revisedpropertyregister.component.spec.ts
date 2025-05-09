import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedpropertyregisterComponent } from './revisedpropertyregister.component';

describe('RevisedpropertyregisterComponent', () => {
  let component: RevisedpropertyregisterComponent;
  let fixture: ComponentFixture<RevisedpropertyregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedpropertyregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedpropertyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
