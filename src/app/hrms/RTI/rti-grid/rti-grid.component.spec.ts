import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtiGridComponent } from './rti-grid.component';

describe('RtiGridComponent', () => {
  let component: RtiGridComponent;
  let fixture: ComponentFixture<RtiGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtiGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
