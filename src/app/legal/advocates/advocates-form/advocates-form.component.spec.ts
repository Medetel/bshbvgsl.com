import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocatesFormComponent } from './advocates-form.component';

describe('AdvocatesFormComponent', () => {
  let component: AdvocatesFormComponent;
  let fixture: ComponentFixture<AdvocatesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvocatesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvocatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
