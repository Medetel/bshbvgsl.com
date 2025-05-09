import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllottmentListComponent } from './allottment-list.component';

describe('AllottmentListComponent', () => {
  let component: AllottmentListComponent;
  let fixture: ComponentFixture<AllottmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllottmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllottmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
