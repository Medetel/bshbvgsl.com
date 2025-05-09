import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqitemGridComponent } from './boqitem-grid.component';

describe('BoqitemGridComponent', () => {
  let component: BoqitemGridComponent;
  let fixture: ComponentFixture<BoqitemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqitemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
