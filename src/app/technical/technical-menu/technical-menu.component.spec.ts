import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalMenuComponent } from './technical-menu.component';

describe('TechnicalMenuComponent', () => {
  let component: TechnicalMenuComponent;
  let fixture: ComponentFixture<TechnicalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
