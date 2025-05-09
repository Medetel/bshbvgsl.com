import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionGridComponent } from './religion-grid.component';

describe('ReligionGridComponent', () => {
  let component: ReligionGridComponent;
  let fixture: ComponentFixture<ReligionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
