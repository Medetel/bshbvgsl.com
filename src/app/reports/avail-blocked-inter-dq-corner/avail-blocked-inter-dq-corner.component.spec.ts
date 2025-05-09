import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailBlockedInterDqCornerComponent } from './avail-blocked-inter-dq-corner.component';

describe('AvailBlockedInterDqCornerComponent', () => {
  let component: AvailBlockedInterDqCornerComponent;
  let fixture: ComponentFixture<AvailBlockedInterDqCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailBlockedInterDqCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailBlockedInterDqCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
