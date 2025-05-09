import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourttypeViewComponent } from './courttype-view.component';

describe('CourttypeViewComponent', () => {
  let component: CourttypeViewComponent;
  let fixture: ComponentFixture<CourttypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourttypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourttypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
