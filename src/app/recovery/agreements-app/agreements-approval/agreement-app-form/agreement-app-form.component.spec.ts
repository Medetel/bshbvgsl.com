import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementAppFormComponent } from './agreement-app-form.component';

describe('AgreementAppFormComponent', () => {
  let component: AgreementAppFormComponent;
  let fixture: ComponentFixture<AgreementAppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementAppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
