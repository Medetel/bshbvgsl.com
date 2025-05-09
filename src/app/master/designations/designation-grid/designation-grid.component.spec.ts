import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationGridComponent } from './designation-grid.component';

describe('DesignationGridComponent', () => {
  let component: DesignationGridComponent;
  let fixture: ComponentFixture<DesignationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
