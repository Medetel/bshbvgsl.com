import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearVacantPropertyComponent } from './clear-vacant-property.component';

describe('ClearVacantPropertyComponent', () => {
  let component: ClearVacantPropertyComponent;
  let fixture: ComponentFixture<ClearVacantPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearVacantPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearVacantPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
