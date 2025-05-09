import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogGridComponent } from './loggrid.component';

describe('RolesGridComponent', () => {
  let component: LogGridComponent;
  let fixture: ComponentFixture<LogGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
