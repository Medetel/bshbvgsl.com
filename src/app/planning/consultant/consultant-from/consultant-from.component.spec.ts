import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantFromComponent } from './consultant-from.component';

describe('ConsultantFromComponent', () => {
  let component: ConsultantFromComponent;
  let fixture: ComponentFixture<ConsultantFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
