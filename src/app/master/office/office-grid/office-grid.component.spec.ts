import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeGridComponent } from './office-grid.component';

describe('OfficeGridComponent', () => {
  let component: OfficeGridComponent;
  let fixture: ComponentFixture<OfficeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
