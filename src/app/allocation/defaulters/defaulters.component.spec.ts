import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultersComponent } from './defaulters.component';

describe('DefaultersComponent', () => {
  let component: DefaultersComponent;
  let fixture: ComponentFixture<DefaultersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
