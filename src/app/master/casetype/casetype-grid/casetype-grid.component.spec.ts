import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetypeGridComponent } from './casetype-grid.component';

describe('CasetypeGridComponent', () => {
  let component: CasetypeGridComponent;
  let fixture: ComponentFixture<CasetypeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasetypeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetypeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
