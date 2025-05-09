import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavGridComponent } from './cav-grid.component';

describe('CavGridComponent', () => {
  let component: CavGridComponent;
  let fixture: ComponentFixture<CavGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
