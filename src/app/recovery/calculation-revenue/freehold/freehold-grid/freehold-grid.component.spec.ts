import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeholdGridComponent } from './freehold-grid.component';

describe('FreeholdGridComponent', () => {
  let component: FreeholdGridComponent;
  let fixture: ComponentFixture<FreeholdGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FreeholdGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeholdGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
