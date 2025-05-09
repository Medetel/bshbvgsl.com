import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypeGridComponent } from './doc-type-grid.component';

describe('DocTypeGridComponent', () => {
  let component: DocTypeGridComponent;
  let fixture: ComponentFixture<DocTypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
