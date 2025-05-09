import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineApplicationGridComponent } from './offline-application-grid.component';

describe('OfflineApplicationGridComponent', () => {
  let component: OfflineApplicationGridComponent;
  let fixture: ComponentFixture<OfflineApplicationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineApplicationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineApplicationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
