import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvPayFormComponent } from './adv-pay-form.component';

describe('AdvPayFormComponent', () => {
  let component: AdvPayFormComponent;
  let fixture: ComponentFixture<AdvPayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvPayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvPayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
