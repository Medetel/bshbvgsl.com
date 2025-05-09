import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteFormComponent } from './caste-form.component';

describe('CasteFormComponent', () => {
  let component: CasteFormComponent;
  let fixture: ComponentFixture<CasteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
