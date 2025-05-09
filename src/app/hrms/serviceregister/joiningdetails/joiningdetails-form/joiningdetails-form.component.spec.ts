import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningdetailsFormComponent } from './joiningdetails-form.component';

describe('JoiningdetailsFormComponent', () => {
  let component: JoiningdetailsFormComponent;
  let fixture: ComponentFixture<JoiningdetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningdetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningdetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
