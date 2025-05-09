import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteGridComponent } from './caste-grid.component';

describe('CasteGridComponent', () => {
  let component: CasteGridComponent;
  let fixture: ComponentFixture<CasteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
