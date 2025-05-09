import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocatesGridComponent } from './advocates-grid.component';

describe('AdvocatesGridComponent', () => {
  let component: AdvocatesGridComponent;
  let fixture: ComponentFixture<AdvocatesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvocatesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvocatesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
