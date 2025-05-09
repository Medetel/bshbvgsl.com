import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesFormComponent } from './scales-form.component';

describe('ScalesFormComponent', () => {
  let component: ScalesFormComponent;
  let fixture: ComponentFixture<ScalesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
