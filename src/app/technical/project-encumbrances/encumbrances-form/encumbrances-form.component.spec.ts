import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncumbrancesFormComponent } from './encumbrances-form.component';

describe('EncumbrancesFormComponent', () => {
  let component: EncumbrancesFormComponent;
  let fixture: ComponentFixture<EncumbrancesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncumbrancesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncumbrancesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
