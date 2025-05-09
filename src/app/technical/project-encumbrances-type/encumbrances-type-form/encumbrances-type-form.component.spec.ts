import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncumbrancesTypeFormComponent } from './encumbrances-type-form.component';

describe('EncumbrancesTypeFormComponent', () => {
  let component: EncumbrancesTypeFormComponent;
  let fixture: ComponentFixture<EncumbrancesTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncumbrancesTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncumbrancesTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
