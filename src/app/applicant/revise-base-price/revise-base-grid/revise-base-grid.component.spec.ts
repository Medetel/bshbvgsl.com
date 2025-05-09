import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseBaseGridComponent } from './revise-base-grid.component';

describe('ReviseBaseGridComponent', () => {
  let component: ReviseBaseGridComponent;
  let fixture: ComponentFixture<ReviseBaseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseBaseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseBaseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
