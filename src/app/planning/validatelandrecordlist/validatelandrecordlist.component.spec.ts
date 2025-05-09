import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatelandrecordlistComponent } from './validatelandrecordlist.component';

describe('ValidatelandrecordlistComponent', () => {
  let component: ValidatelandrecordlistComponent;
  let fixture: ComponentFixture<ValidatelandrecordlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatelandrecordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatelandrecordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
