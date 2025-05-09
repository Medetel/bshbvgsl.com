import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundRentFormComponent } from './ground-rent-form.component';

describe('GroundRentFormComponent', () => {
  let component: GroundRentFormComponent;
  let fixture: ComponentFixture<GroundRentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroundRentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundRentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
