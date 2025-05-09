import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhbInstachallanComponent } from './khb-instachallan.component';

describe('KhbInstachallanComponent', () => {
  let component: KhbInstachallanComponent;
  let fixture: ComponentFixture<KhbInstachallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhbInstachallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhbInstachallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
