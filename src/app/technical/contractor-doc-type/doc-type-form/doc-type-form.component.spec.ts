import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypeFormComponent } from './doc-type-form.component';

describe('DocTypeFormComponent', () => {
  let component: DocTypeFormComponent;
  let fixture: ComponentFixture<DocTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
