import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmeetinggridComponent } from './boardmeetinggrid.component';

describe('BoardmeetinggridComponent', () => {
  let component: BoardmeetinggridComponent;
  let fixture: ComponentFixture<BoardmeetinggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardmeetinggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardmeetinggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
