import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourttypeFormComponent } from './courttype-form.component';

describe('CourttypeFormComponent', () => {
  let component: CourttypeFormComponent;
  let fixture: ComponentFixture<CourttypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourttypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourttypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
