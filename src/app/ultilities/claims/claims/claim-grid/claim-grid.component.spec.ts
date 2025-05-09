import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimGridComponent } from './claim-grid.component';

describe('ClaimGridComponent', () => {
  let component: ClaimGridComponent;
  let fixture: ComponentFixture<ClaimGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
