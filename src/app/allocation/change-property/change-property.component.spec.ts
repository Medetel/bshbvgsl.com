import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePropertyComponent } from './change-property.component';

describe('ChangePropertyComponent', () => {
  let component: ChangePropertyComponent;
  let fixture: ComponentFixture<ChangePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
