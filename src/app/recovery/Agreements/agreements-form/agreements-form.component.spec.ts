import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsFormComponent } from './agreements-form.component';

describe('AgreementsFormComponent', () => {
  let component: AgreementsFormComponent;
  let fixture: ComponentFixture<AgreementsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
