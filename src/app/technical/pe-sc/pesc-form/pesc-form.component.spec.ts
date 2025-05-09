import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PescFormComponent } from './pesc-form.component';

describe('PescFormComponent', () => {
  let component: PescFormComponent;
  let fixture: ComponentFixture<PescFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PescFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
