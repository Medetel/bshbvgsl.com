import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1menuComponent } from './level1menu.component';

describe('Level1menuComponent', () => {
  let component: Level1menuComponent;
  let fixture: ComponentFixture<Level1menuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1menuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1menuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
