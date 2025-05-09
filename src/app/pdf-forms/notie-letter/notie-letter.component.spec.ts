import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotieLetterComponent } from './notie-letter.component';

describe('NotieLetterComponent', () => {
  let component: NotieLetterComponent;
  let fixture: ComponentFixture<NotieLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotieLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotieLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
