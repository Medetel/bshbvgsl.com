import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltilitiesMenuComponent } from './ultilities-menu.component';

describe('UltilitiesMenuComponent', () => {
  let component: UltilitiesMenuComponent;
  let fixture: ComponentFixture<UltilitiesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltilitiesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltilitiesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
