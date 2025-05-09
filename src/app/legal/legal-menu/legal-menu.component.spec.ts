import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalMenuComponent } from './legal-menu.component';

describe('LegalMenuComponent', () => {
  let component: LegalMenuComponent;
  let fixture: ComponentFixture<LegalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
