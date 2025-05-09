import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpCrViewComponent } from './cp-cr-grid.component';

describe('CpViewComponent', () => {
  let component: CpCrViewComponent;
  let fixture: ComponentFixture<CpCrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpCrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpCrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
