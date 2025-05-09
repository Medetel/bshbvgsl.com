import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncometaxParameterComponent } from './incometax-parameter.component';

describe('IncometaxParameterComponent', () => {
  let component: IncometaxParameterComponent;
  let fixture: ComponentFixture<IncometaxParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncometaxParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncometaxParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
