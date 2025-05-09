import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotedPropertyListComponent } from './alloted-property-list.component';

describe('AllotedPropertyListComponent', () => {
  let component: AllotedPropertyListComponent;
  let fixture: ComponentFixture<AllotedPropertyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotedPropertyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotedPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
