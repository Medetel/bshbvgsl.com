import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementdetailsFormComponent } from './incrementdetails-form.component';

describe('IncrementdetailsFormComponent', () => {
  let component: IncrementdetailsFormComponent;
  let fixture: ComponentFixture<IncrementdetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementdetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementdetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
