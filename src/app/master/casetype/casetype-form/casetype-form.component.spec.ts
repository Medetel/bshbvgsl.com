import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetypeFormComponent } from './casetype-form.component';

describe('CasetypeFormComponent', () => {
  let component: CasetypeFormComponent;
  let fixture: ComponentFixture<CasetypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasetypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
