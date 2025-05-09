import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdocFormComponent } from './registerdoc-form.component';

describe('RegisterdocFormComponent', () => {
  let component: RegisterdocFormComponent;
  let fixture: ComponentFixture<RegisterdocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterdocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
