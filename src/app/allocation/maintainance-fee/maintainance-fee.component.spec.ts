import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainanceFeeComponent } from './maintainance-fee.component';

describe('MaintainanceFeeComponent', () => {
  let component: MaintainanceFeeComponent;
  let fixture: ComponentFixture<MaintainanceFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainanceFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainanceFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
