import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeFormComponent } from './administrative-form.component';

describe('AdministrativeFormComponent', () => {
  let component: AdministrativeFormComponent;
  let fixture: ComponentFixture<AdministrativeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
