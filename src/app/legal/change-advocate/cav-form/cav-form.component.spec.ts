import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavFormComponent } from './cav-form.component';

describe('CavFormComponent', () => {
  let component: CavFormComponent;
  let fixture: ComponentFixture<CavFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
