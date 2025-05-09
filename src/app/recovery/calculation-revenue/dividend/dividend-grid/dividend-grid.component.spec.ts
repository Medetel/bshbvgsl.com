import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendGridComponent } from './dividend-grid.component';

describe('DividendGridComponent', () => {
  let component: DividendGridComponent;
  let fixture: ComponentFixture<DividendGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DividendGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
