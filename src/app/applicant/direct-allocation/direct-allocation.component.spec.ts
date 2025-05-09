import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectAllocationComponent } from './direct-allocation.component';

describe('DirectAllocationComponent', () => {
  let component: DirectAllocationComponent;
  let fixture: ComponentFixture<DirectAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
