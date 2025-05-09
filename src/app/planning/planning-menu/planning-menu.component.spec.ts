import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMenuComponent } from './planning-menu.component';

describe('PlanningMenuComponent', () => {
  let component: PlanningMenuComponent;
  let fixture: ComponentFixture<PlanningMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
