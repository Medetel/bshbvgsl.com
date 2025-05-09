import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesGridComponent } from './scales-grid.component';

describe('ScalesGridComponent', () => {
  let component: ScalesGridComponent;
  let fixture: ComponentFixture<ScalesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
