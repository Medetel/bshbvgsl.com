import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeGridComponent } from './administrative-grid.component';

describe('AdministrativeGridComponent', () => {
  let component: AdministrativeGridComponent;
  let fixture: ComponentFixture<AdministrativeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
