import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvPayGridComponent } from './adv-pay-grid.component';

describe('AdvPayGridComponent', () => {
  let component: AdvPayGridComponent;
  let fixture: ComponentFixture<AdvPayGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvPayGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvPayGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
