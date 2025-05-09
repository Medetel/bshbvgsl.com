import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualGridComponent } from './manual-grid.component';

describe('ManualGridComponent', () => {
  let component: ManualGridComponent;
  let fixture: ComponentFixture<ManualGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
