import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementAppGridComponent } from './agreement-app-grid.component';

describe('AgreementAppGridComponent', () => {
  let component: AgreementAppGridComponent;
  let fixture: ComponentFixture<AgreementAppGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementAppGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementAppGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
