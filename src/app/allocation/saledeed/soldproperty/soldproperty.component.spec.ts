import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldpropertyComponent } from './soldproperty.component';

describe('SoldpropertyComponent', () => {
  let component: SoldpropertyComponent;
  let fixture: ComponentFixture<SoldpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
