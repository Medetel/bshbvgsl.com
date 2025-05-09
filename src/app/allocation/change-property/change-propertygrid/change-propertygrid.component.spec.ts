import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePropertygridComponent } from './change-propertygrid.component';

describe('ChangePropertygridComponent', () => {
  let component: ChangePropertygridComponent;
  let fixture: ComponentFixture<ChangePropertygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePropertygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePropertygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
