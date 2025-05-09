import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllotedListComponent } from './not-alloted-list.component';

describe('NotAllotedListComponent', () => {
  let component: NotAllotedListComponent;
  let fixture: ComponentFixture<NotAllotedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAllotedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAllotedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
