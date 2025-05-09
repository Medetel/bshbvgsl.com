import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionAllotmentComponent } from './provision-allotment.component';

describe('ProvisionAllotmentComponent', () => {
  let component: ProvisionAllotmentComponent;
  let fixture: ComponentFixture<ProvisionAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
