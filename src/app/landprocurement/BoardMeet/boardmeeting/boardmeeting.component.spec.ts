import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmeetingComponent } from './boardmeeting.component';

describe('BoardmeetingComponent', () => {
  let component: BoardmeetingComponent;
  let fixture: ComponentFixture<BoardmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
