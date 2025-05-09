import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictwiseVacantPropertyComponent } from './districtwise-vacant-property.component';

describe('DistrictwiseVacantPropertyComponent', () => {
  let component: DistrictwiseVacantPropertyComponent;
  let fixture: ComponentFixture<DistrictwiseVacantPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictwiseVacantPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictwiseVacantPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
