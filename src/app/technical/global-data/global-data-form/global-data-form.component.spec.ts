import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDataFormComponent } from './global-data-form.component';

describe('GlobalDataFormComponent', () => {
  let component: GlobalDataFormComponent;
  let fixture: ComponentFixture<GlobalDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
