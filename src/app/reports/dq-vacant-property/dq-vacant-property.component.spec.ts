import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqVacantPropertyComponent } from './dq-vacant-property.component';

describe('DqVacantPropertyComponent', () => {
  let component: DqVacantPropertyComponent;
  let fixture: ComponentFixture<DqVacantPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqVacantPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqVacantPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
