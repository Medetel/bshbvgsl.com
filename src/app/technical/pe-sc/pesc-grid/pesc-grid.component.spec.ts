import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PescGridComponent } from './pesc-grid.component';

describe('PescGridComponent', () => {
  let component: PescGridComponent;
  let fixture: ComponentFixture<PescGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PescGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
