import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstatusComponent } from './applicationstatus.component';

describe('ApplicationstatusComponent', () => {
  let component: ApplicationstatusComponent;
  let fixture: ComponentFixture<ApplicationstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
