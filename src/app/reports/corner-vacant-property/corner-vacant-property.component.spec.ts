import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerVacantPropertyComponent } from './corner-vacant-property.component';

describe('CornerVacantPropertyComponent', () => {
  let component: CornerVacantPropertyComponent;
  let fixture: ComponentFixture<CornerVacantPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornerVacantPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerVacantPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
