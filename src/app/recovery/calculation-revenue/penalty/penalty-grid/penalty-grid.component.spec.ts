import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyGridComponent } from './penalty-grid.component';

describe('PenaltyGridComponent', () => {
  let component: PenaltyGridComponent;
  let fixture: ComponentFixture<PenaltyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PenaltyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
