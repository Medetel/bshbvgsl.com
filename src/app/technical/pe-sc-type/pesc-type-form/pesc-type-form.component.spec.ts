import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PescTypeFormComponent } from './pesc-type-form.component';

describe('PescTypeFormComponent', () => {
  let component: PescTypeFormComponent;
  let fixture: ComponentFixture<PescTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PescTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
