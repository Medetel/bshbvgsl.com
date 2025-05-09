import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFormComponent } from './tender-form.component';

describe('TenderFormComponent', () => {
  let component: TenderFormComponent;
  let fixture: ComponentFixture<TenderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
