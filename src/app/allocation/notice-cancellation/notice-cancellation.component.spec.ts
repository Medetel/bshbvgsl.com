import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCancellationComponent } from './notice-cancellation.component';

describe('NoticeCancellationComponent', () => {
  let component: NoticeCancellationComponent;
  let fixture: ComponentFixture<NoticeCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
