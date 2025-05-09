import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderGridComponent } from './tender-grid.component';

describe('TenderGridComponent', () => {
  let component: TenderGridComponent;
  let fixture: ComponentFixture<TenderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
