import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementGridComponent } from './increment-grid.component';

describe('IncrementGridComponent', () => {
  let component: IncrementGridComponent;
  let fixture: ComponentFixture<IncrementGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
