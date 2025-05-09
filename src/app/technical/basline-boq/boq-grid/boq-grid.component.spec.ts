import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqGridComponent } from './boq-grid.component';

describe('BoqGridComponent', () => {
  let component: BoqGridComponent;
  let fixture: ComponentFixture<BoqGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
