import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemasterFormComponent } from './filemaster-form.component';

describe('FilemasterFormComponent', () => {
  let component: FilemasterFormComponent;
  let fixture: ComponentFixture<FilemasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
