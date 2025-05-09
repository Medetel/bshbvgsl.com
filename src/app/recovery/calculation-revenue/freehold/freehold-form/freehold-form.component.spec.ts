import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeholdFormComponent } from './freehold-form.component';

describe('FreeholdFormComponent', () => {
  let component: FreeholdFormComponent;
  let fixture: ComponentFixture<FreeholdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FreeholdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeholdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
