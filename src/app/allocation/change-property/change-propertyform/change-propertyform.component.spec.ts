import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePropertyformComponent } from './change-propertyform.component';

describe('ChangePropertyformComponent', () => {
  let component: ChangePropertyformComponent;
  let fixture: ComponentFixture<ChangePropertyformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePropertyformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePropertyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
